import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import axios from "axios";

// Call this function to register your webhook with Lodgify for booking_change events
export async function registerLodgifyWebhook() {
  const lodgifyApiKey = process.env.LODGIFY_KEY;
  if (!lodgifyApiKey) throw new Error("LODGYIFY_KEY is missing in env");

  const target_url = process.env.LODGIFY_WEBHOOK_URL;
  if (!target_url) throw new Error("LODGYIFY_WEBHOOK_URL is missing in env");

  // Register for booking_change event
  const payload = { target_url, event: "booking_change" };
  console.log("Registering Lodgify webhook with URL:", target_url);
  const response = await axios.post(
    "https://api.lodgify.com/webhooks/v1/subscribe",
    payload,
    {
      headers: {
        "X-ApiKey": lodgifyApiKey,
        "Content-Type": "application/*+json",
        "accept": "application/json"
      },
    }
  );
  return response.data;
}

// If running directly, register the webhook
if (require.main === module) {
  registerLodgifyWebhook().then(console.log).catch(console.error);
}
