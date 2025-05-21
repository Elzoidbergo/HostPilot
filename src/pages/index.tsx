import { useState } from 'react';
import type { GetBookingByIdResponse200 } from "../generated/lodgify/types";

export default function LodgifyBookingPage() {
  const [bookingId, setBookingId] = useState('');
  const [booking, setBooking] = useState<GetBookingByIdResponse200 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetBooking = async () => {
    setLoading(true);
    setError(null);
    setBooking(null);
    try {
      const res = await fetch(`/api/lodgify-booking?id=${encodeURIComponent(bookingId)}`);
      if (!res.ok) throw new Error('Failed to fetch booking');
      const apiResponse = await res.json();
      const booking: GetBookingByIdResponse200 = apiResponse.data;
      setBooking(booking);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Lodgify Booking Lookup</h1>
      <input
        type="text"
        placeholder="Booking ID"
        value={bookingId}
        onChange={e => setBookingId(e.target.value)}
        style={{ padding: 8, width: '70%' }}
      />
      <button onClick={handleGetBooking} style={{ marginLeft: 8, padding: 8 }} disabled={loading || !bookingId}>
        {loading ? 'Loading...' : 'GET'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      {booking && (
        <div style={{ marginTop: 24, background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
          <div><b>Guest Name:</b> {booking.guest?.guest_name?.full_name || 'N/A'}</div>
          <div><b>Property id:</b> {booking.property_id || 'N/A'}</div>
          <div><b>Date of Arrival:</b> {booking.arrival || 'N/A'}</div>
        </div>
      )}
    </div>
  );
}
