import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { lodgifyWebhookEventSchema, type LodgifyWebhookEvent } from '../../lib/lodgifyWebhookEventSchema';

const prisma = new PrismaClient();

// Handler for Lodgify webhooks
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  let event: LodgifyWebhookEvent | LodgifyWebhookEvent[];
  try {
    event = lodgifyWebhookEventSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({ error: 'Invalid webhook payload', details: err.errors });
  }
  debugger;
  // Handle both single event and array of events
  const events = Array.isArray(event) ? event : [event];
  for (const ev of events) {
    console.log('Received Lodgify event', ev.action);


    if (ev.action === "booking_change") {
      await handleBookingChange(ev);
    }
    // Add handling for other event types as needed
  }

  res.status(200).json({ message: 'Event(s) processed' });
}

async function handleBookingChange(ev: any) {
  const checkIn = new Date(ev.booking.date_arrival).getTime();
  const checkOut = new Date(ev.booking.date_departure).getTime();
  const threshold = parseFloat(process.env.CLEAN_NOTIFY_THRESHOLD_HOURS || '72');
  const hours = (checkIn - Date.now()) / 36e5;
  if (hours < threshold) {
    console.log(`Notify cleaner (${ev.booking.status} <${threshold}h):`, ev.booking.id);
    try {
      await prisma.reservationUpdate.create({
        data: {
          guestName: ev.guest.name || '',
          checkInDate: new Date(ev.booking.date_arrival),
          checkOutDate: new Date(ev.booking.date_departure),
          status: ev.booking.status,
          listingId: String(ev.booking.property_id),
        },
      });
      console.log('Reservation update successfully created in the database.');
    } catch (error) {
      console.error('Error creating reservation update:', error);
    }
  }
}
