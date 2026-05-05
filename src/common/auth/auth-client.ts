import { createAuthClient } from 'better-auth/client';
import { magicLinkClient } from 'better-auth/client/plugins';

const authClient = createAuthClient({
  plugins: [magicLinkClient()],
}) as ReturnType<typeof createAuthClient>;

export default authClient;
