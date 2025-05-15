import { z } from "zod";

export const guestSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  country_code: z.string().nullable(),
});

export const roomSchema = z.object({
  room_type_id: z.number(),
  guest_breakdown: z.object({
    adults: z.number(),
    children: z.number(),
    infants: z.number(),
    pets: z.number(),
  }),
  people: z.number(),
  key_code: z.string(),
});

export const policySchema = z.object({
  name: z.string(),
  payments: z.string(),
  cancellation: z.string(),
  damage_deposit: z.string(),
});

export const priceSchema = z.object({
  type: z.string(),
  amount: z.number(),
  description: z.string(),
});

export const roomTypeItemSchema = z.object({
  room_type_id: z.number(),
  subtotal: z.number(),
  prices: z.array(priceSchema),
});

export const quoteSchema = z.object({
  id: z.number(),
  policy: policySchema,
  status: z.string(),
  scheduled_transactions: z.array(z.unknown()),
  scheduled_damage_protection: z.array(z.unknown()),
  room_type_items: z.array(roomTypeItemSchema),
  addon_items: z.array(z.unknown()),
  other_items: z.array(z.unknown()),
  vat_items: z.array(z.unknown()),
});

export const subtotalsSchema = z.object({
  stay: z.number(),
  promotions: z.number(),
  fees: z.number(),
  taxes: z.number(),
  addons: z.number(),
  vat: z.number(),
});

export const checkSchema = z.object({
  time: z.string().nullable(),
  initiator: z.string().nullable(),
});

export const bookingSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  arrival: z.string(),
  departure: z.string(),
  property_id: z.number(),
  rooms: z.array(roomSchema),
  guest: guestSchema,
  language: z.string(),
  status: z.string(),
  is_unavailable: z.boolean(),
  is_overbooked: z.boolean(),
  tentative_expires_at: z.string().nullable(),
  source: z.string(),
  source_text: z.string(),
  created_from_ip: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  canceled_at: z.string().nullable(),
  is_new: z.boolean(),
  is_deleted: z.boolean(),
  currency_code: z.string(),
  total_amount: z.number(),
  subtotals: subtotalsSchema,
  amount_paid: z.number(),
  amount_due: z.number(),
  quote: quoteSchema,
  transactions: z.array(z.unknown()),
  damage_protection: z.array(z.unknown()),
  notes: z.string().nullable(),
  thread_uid: z.string(),
  external_booking: z.unknown().nullable(),
  check_in: checkSchema,
  check_out: checkSchema,
});

export type LodgifyBooking = z.infer<typeof bookingSchema>;
