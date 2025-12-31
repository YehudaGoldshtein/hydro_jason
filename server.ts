import {createRequestHandler} from '@shopify/remix-oxygen';
// @ts-ignore - This will be generated at build time
import * as remixBuild from 'virtual:remix/server-build';

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: (env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
        getLoadContext: () => ({
          env,
          waitUntil: executionContext.waitUntil.bind(executionContext),
        }),
      });

      return await handleRequest(request);
    } catch (error) {
      console.error('Server error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Return JSON error response instead of plain text
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
};

