import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// LodgifyWebhookEvent is a discriminated union matching Lodgify webhook payloads as per https://apidocs.lodgify.com/reference/webhooks-overview
// If Lodgify updates their API, update this type accordingly.
// TODO: For extra safety, consider adding runtime validation (e.g., with Zod or custom logic).
export type LodgifyWebhookEvent =
  | {
      action: 'rate_change';
      property_id: number;
      room_type_ids: number[];
    }
  | {
      action: 'availability_change';
      property_id: number;
      room_type_ids: number[];
      start: string;
      end: string;
      source: string;
    }
  | {
      action: 'guest_message_received';
      thread_uid: string;
      message_id: number;
      inbox_uid: string;
      guest_name: string;
      subject: string | null;
      message: string;
      creation_time: string;
      has_attachments: boolean;
      sub_owner_id: number | null;
    }
  | {
      action: 'booking_change' | 'booking_created' | 'booking_canceled';
      type?: string;
      booking: {
        type: string;
        id: number;
        date_arrival: string;
        date_departure: string;
        date_created: string;
        property_id: number;
        property_name: string;
        property_image_url: string;
        status: string;
        room_types: Array<{
          id: number;
          room_type_id: number;
          image_url: string | null;
          name: string;
          people: number;
        }>;
        add_ons: Array<{
          add_on_id: number;
          name: string;
          units: number;
        }>;
        currency_code: string;
        source: string;
        source_text: string;
        notes: string | null;
        language: string;
        ip_address: string | null;
        ip_country: string | null;
        is_policy_active: boolean;
        external_url: string | null;
        nights: number;
        promotion_code: string | null;
      };
      guest: {
        uid: string;
        name: string;
        email: string;
        phone_number: string;
        country: string | null;
        country_code: string | null;
      };
      current_order?: {
        id: number;
        property_id: number;
        currency_code: string;
        status: string;
        amount_gross: {
          amount: string;
          total_room_rate_amount: string;
          total_fees_amount: string;
          total_taxes_amount: string;
          total_promotions_amount: string;
        };
        amount_net: {
          amount: string;
          total_room_rate_amount: string;
          total_fees_amount: string;
          total_taxes_amount: string;
          total_promotions_amount: string;
        };
        amount_vat: {
          amount: string;
          total_room_rate_amount: string;
          total_fees_amount: string;
          total_taxes_amount: string;
          total_promotions_amount: string;
        };
        date_agreed: string;
        cancellation_policy_text: string;
        security_deposit_text: string;
        scheduled_policy_text: string;
        rate_policy_name: string;
        rental_agreement_accepted: boolean;
        owner_payout: number;
      };
      subowner?: {
        user_id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
      };
      booking_total_amount?: string;
      booking_currency_code?: string;
      total_transactions?: {
        amount: string;
      };
      balance_due?: string;
    };

const prisma = new PrismaClient();

// Handler for Lodgify webhooks
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  let event: LodgifyWebhookEvent | LodgifyWebhookEvent[];
  try {
    // No schema validation available, just parse JSON
    event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    // TODO: Add validation for LodgifyWebhookEvent shape if needed
  } catch (err: any) {
    return res.status(400).json({ error: 'Invalid webhook payload', details: err.message });
  }

  // Handle both single event and array of events
  const events = Array.isArray(event) ? event : [event];
  for (const ev of events) {
    console.log('Received Lodgify event', ev.action);
    console.log('Prisma client initialized with database URL:', process.env.DATABASE_URL);

    if (
      ev.action === 'booking_change' ||
      ev.action === 'booking_created' ||
      ev.action === 'booking_canceled'
    ) {
      // TypeScript will now know ev has booking/guest fields
      const checkIn = new Date(ev.booking.date_arrival).getTime();
      const checkOut = new Date(ev.booking.date_departure).getTime();
      const hours = (checkIn - Date.now()) / 36e5;
      const threshold = parseFloat(process.env.CLEAN_NOTIFY_THRESHOLD_HOURS || '72');
      if (hours < threshold) {
        console.log(`Notify cleaner (${ev.type ?? ev.action} <${threshold}h):`, ev.booking.id);
        try {
          await prisma.reservationUpdate.create({
            data: {
              guestName: ev.guest.name || '',
              checkInDate: new Date(ev.booking.date_arrival),
              checkOutDate: new Date(ev.booking.date_departure),
              status:
                ev.type === 'booking_created'
                  ? 'created'
                  : ev.type === 'booking_canceled'
                  ? 'canceled'
                  : 'changed',
              listingId: String(ev.booking.property_id),
            },
          });
          console.log('Reservation update successfully created in the database.');
        } catch (error) {
          console.error('Error creating reservation update:', error);
        }
      }
    } else if (ev.action === 'rate_change') {
      console.log('Rate change event:', {
        property_id: ev.property_id,
        room_type_ids: ev.room_type_ids,
      });
      // TODO: Add logic to update rates in your database if needed
    } else if (ev.action === 'availability_change') {
      console.log('Availability change event:', {
        property_id: ev.property_id,
        room_type_ids: ev.room_type_ids,
        start: ev.start,
        end: ev.end,
        source: ev.source,
      });
      // TODO: Add logic to update availability in your database if needed
    } else if (ev.action === 'guest_message_received') {
      console.log('Guest message received:', {
        thread_uid: ev.thread_uid,
        message_id: ev.message_id,
        inbox_uid: ev.inbox_uid,
        guest_name: ev.guest_name,
        subject: ev.subject,
        message: ev.message,
        creation_time: ev.creation_time,
        has_attachments: ev.has_attachments,
        sub_owner_id: ev.sub_owner_id,
      });
      // TODO: Add logic to notify staff or store messages if needed
    }
    // Add handling for other event types as needed
  }

  res.status(200).json({ message: 'Event(s) processed' });
}