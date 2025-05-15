import type { NextApiRequest, NextApiResponse } from 'next';
import { bookingSchema, type LodgifyBooking } from "../../lib/lodgifyBookingSchema";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid booking id' });
  }

  try {
    console.log('Fetching booking with ID:', id);
    const response = await axios.get(`https://api.lodgify.com/v2/reservations/bookings/${id}`, {
      headers: {
        'X-ApiKey': process.env.LODGIFY_KEY,
      },
    });
    const booking: LodgifyBooking = bookingSchema.parse(response.data);
    res.status(200).json(booking);

  } catch (error: any) {
    console.error('Error fetching booking:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      bookingId: id,
      lodgifyKeyPresent: Boolean(process.env.LODGIFY_KEY),
    });
    res.status(500).json({
      error: error.message || 'Failed to fetch booking',
      details: {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        bookingId: id,
        lodgifyKeyPresent: Boolean(process.env.LODGIFY_KEY),
      }
    });
  }
}
