import { makeApi, Zodios } from '@zodios/core';
import { z } from 'zod';

// Define the schema for the booking response (simplified for demo)
const bookingResponseSchema = z.object({
  id: z.string(),
  status: z.string(),
  guest: z.object({ name: z.string().optional() }).optional(),
  property_id: z.string().optional(),
  date_arrival: z.string().optional(),
  // ... add more fields as needed based on Lodgify docs
});

// Define the API endpoint for Lodgify
const lodgifyApi = makeApi([
  {
    method: 'post',
    path: '/booking/async',
    alias: 'createBooking',
    parameters: [
      { name: 'body', type: 'Body', schema: z.any() }, // Adjust schema as needed
    ],
    response: bookingResponseSchema,
  },
  {
    method: 'get',
    path: '/booking/async/:id',
    alias: 'getBooking',
    parameters: [
      { name: 'id', type: 'Path', schema: z.string() },
    ],
    response: bookingResponseSchema,
  },
]);

const getLodgifyApiKey = () => {
  if (typeof process !== 'undefined' && process.env.LODGIFY_KEY) {
    return process.env.LODGIFY_KEY;
  }
  // fallback for client-side or missing env
  return '';
};

// Create the Zodios client (without default headers)
export const lodgifyClient = new Zodios('https://api.lodgify.com/v2', lodgifyApi);
