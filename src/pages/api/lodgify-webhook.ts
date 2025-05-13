import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler for Lodgify webhooks
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const event = req.body;
  console.log('Received Lodgify event:', event.type);

  const threshold = parseFloat(process.env.CLEAN_NOTIFY_THRESHOLD_HOURS || '72');
  if (['booking_created', 'booking_canceled'].includes(event.type)) {
    const checkIn = new Date(event.data.checkIn).getTime();
    const hours = (checkIn - Date.now()) / 36e5;
    if (hours < threshold) {
      const action = event.type === 'booking_created' ? 'New booking' : 'Cancellation';
      console.log(`Notify cleaner (${action} <${threshold}h):`, event.data.bookingId);

      // Update the ReservationUpdate table
      await prisma.reservationUpdate.create({
        data: {
          guestName: event.data.guestName,
          checkInDate: new Date(event.data.checkIn),
          checkOutDate: new Date(event.data.checkOut),
          status: event.type === 'booking_created' ? 'created' : 'canceled',
          listingId: event.data.listingId,
        },
      });
    }
  }

  if (event.type === 'booking_message_created') {
    console.log('Enqueue auto-reply for booking:', event.data.bookingId);
  }

  res.status(200).json({ message: 'Event processed' });
}
