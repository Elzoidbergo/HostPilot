import { z } from "zod";

// Booking event schemas (already defined, unchanged)
const roomTypeSchema = z.object({
  id: z.number(),
  room_type_id: z.number(),
  image_url: z.string().nullable(),
  name: z.string(),
  people: z.number(),
});

const amountSchema = z.object({
  amount: z.string(),
  total_room_rate_amount: z.string(),
  total_fees_amount: z.string(),
  total_taxes_amount: z.string(),
  total_promotions_amount: z.string(),
});

const bookingEventSchema = z.object({
  action: z.literal("booking_change"),
  booking: z.object({
    type: z.string(),
    id: z.number(),
    date_arrival: z.string(),
    date_departure: z.string(),
    date_created: z.string(),
    property_id: z.number(),
    property_name: z.string(),
    property_image_url: z.string(),
    status: z.string(),
    room_types: z.array(roomTypeSchema),
    add_ons: z.array(z.unknown()),
    currency_code: z.string(),
    source: z.string(),
    source_text: z.string(),
    notes: z.string().nullable(),
    language: z.string(),
    ip_address: z.string().nullable(),
    ip_country: z.string().nullable(),
    is_policy_active: z.boolean(),
    external_url: z.string().nullable(),
    nights: z.number(),
    promotion_code: z.string().nullable(),
  }),
  guest: z.object({
    uid: z.string(),
    name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    country: z.string().nullable(),
    country_code: z.string().nullable(),
  }),
  current_order: z.object({
    id: z.number(),
    property_id: z.number(),
    currency_code: z.string(),
    status: z.string(),
    amount_gross: amountSchema,
    amount_net: amountSchema,
    amount_vat: amountSchema,
    date_agreed: z.string().nullable(), // allow nulls from Lodgify
    cancellation_policy_text: z.string().nullable(),
    security_deposit_text: z.string().nullable(),
    scheduled_policy_text: z.string().nullable(),
    rate_policy_name: z.string().nullable(),
    rental_agreement_accepted: z.boolean(),
    owner_payout: z.number(),
  }),
  subowner: z.object({
    user_id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  booking_total_amount: z.string(),
  booking_currency_code: z.string(),
  total_transactions: z.object({ amount: z.string() }),
  balance_due: z.string(),
});

// Rate change event
const rateChangeEventSchema = z.object({
  action: z.literal("rate_change"),
  property_id: z.number(),
  room_type_ids: z.array(z.number()),
});

// Availability change event
const availabilityChangeEventSchema = z.object({
  action: z.literal("availability_change"),
  property_id: z.number(),
  room_type_ids: z.array(z.number()),
  start: z.string(),
  end: z.string(),
  source: z.string(),
});

// Guest message received event
const guestMessageReceivedEventSchema = z.object({
  action: z.literal("guest_message_received"),
  thread_uid: z.string(),
  message_id: z.number(),
  inbox_uid: z.string(),
  guest_name: z.string(),
  subject: z.string().nullable(),
  message: z.string(),
  creation_time: z.string(),
  has_attachments: z.boolean(),
  sub_owner_id: z.number(),
});

// Accept either a single event object or an array of event objects
export const lodgifyWebhookEventSchema = z.union([
  z.discriminatedUnion("action", [
    bookingEventSchema,
    rateChangeEventSchema,
    availabilityChangeEventSchema,
    guestMessageReceivedEventSchema,
  ]),
  z.array(
    z.discriminatedUnion("action", [
      bookingEventSchema,
      rateChangeEventSchema,
      availabilityChangeEventSchema,
      guestMessageReceivedEventSchema,
    ])
  ),
]);

export type LodgifyWebhookEvent = z.infer<typeof lodgifyWebhookEventSchema>;
