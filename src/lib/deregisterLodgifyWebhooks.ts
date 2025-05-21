import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import axios from 'axios';

async function listAndDeregisterLodgifyWebhooks() {
  const lodgifyApiKey = process.env.LODGIFY_KEY;
  if (!lodgifyApiKey) throw new Error('LODGYIFY_KEY is missing in env');

  // 1. List all registered webhooks
  const listResp = await axios.get(
    'https://api.lodgify.com/webhooks/v1/list',
    {
      headers: {
        'X-ApiKey': lodgifyApiKey,
        'accept': 'application/json',
      },
    }
  );
  const webhooks = listResp.data;
  if (!Array.isArray(webhooks) || webhooks.length === 0) {
    console.log('No webhooks registered.');
    return;
  }
  console.log(`Found ${webhooks.length} webhook(s). Deregistering...`);

  // 2. Deregister each webhook
  for (const wh of webhooks) {
    try {
      await axios.delete(
        'https://api.lodgify.com/webhooks/v1/unsubscribe',
        {
          headers: {
            'X-ApiKey': lodgifyApiKey,
            'accept': 'application/json',
            'Content-Type': 'application/*+json',
          },
          data: { id: wh.id },
        }
      );
      console.log(`Deregistered webhook: ${wh.id}`);
    } catch (err : any) {
      console.error(`Failed to deregister webhook ${wh.id}:`, err?.response?.data || err);
    }
  }
  console.log('Done.');
}

if (require.main === module) {
  listAndDeregisterLodgifyWebhooks().catch(console.error);
}
