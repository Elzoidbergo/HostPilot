// Import the Lodgify SDK generated client
import createLodgifySDK from '../generated/lodgify';

// Create an SDK instance and authenticate with your API key
const sdk = createLodgifySDK;
sdk.auth(process.env.LODGIFY_KEY!);

export default sdk;

// You can now use the SDK's exported functions/classes in your app.
