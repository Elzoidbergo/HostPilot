import type { NextApiRequest, NextApiResponse } from 'next';
import lodgify from '../../lib/lodgifyClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 const { id } = req.query;
  const bookingId = Number(id);
  if (isNaN(bookingId)) {
    return res.status(400).json({ error: "Invalid booking ID" });
  }
  try {
    console.log('Fetching booking with ID:', bookingId);
    const booking = await lodgify.getBookingById({ id: bookingId });
    res.status(200).json(booking);
  } catch (error: any) {
    console.error('Error fetching booking:', {
      message: error.message,
      stack: error.stack,
      bookingId: bookingId,
      lodgifyKeyPresent: Boolean(process.env.LODGIFY_KEY),
    });
    res.status(500).json({
      error: error.message || 'Failed to fetch booking',
      details: {
        bookingId: bookingId,
        lodgifyKeyPresent: Boolean(process.env.LODGIFY_KEY),
      }
    });
  }
}
