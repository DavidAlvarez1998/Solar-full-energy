import type { Handler, HandlerEvent } from '@netlify/functions';

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN ?? 'solar_verify_token';
const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN ?? '';
const QUOTE_URL = process.env.SITE_URL ?? 'https://solarfullenergy.com/#chatbot';
const GRAPH_API = 'https://graph.facebook.com/v18.0/me/messages';

const REPLY_TEXT = `¡Hola! Podés cotizar tu sistema solar en segundos aquí: ${QUOTE_URL}`;

/** Send a Messenger reply — fire-and-forget, do NOT await before returning 200. */
function sendReply(recipientId: string): void {
  fetch(GRAPH_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: REPLY_TEXT },
    }),
  }).catch((err: unknown) => {
    console.error('[fb-webhook] Send API error:', err);
  });
}

export const handler: Handler = async (event: HandlerEvent) => {
  // ── GET: Meta webhook verification ──────────────────────────────────────
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters ?? {};
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.info('[fb-webhook] Verified successfully');
      return { statusCode: 200, body: challenge ?? '' };
    }

    console.warn('[fb-webhook] Verification failed — token mismatch or wrong mode');
    return { statusCode: 403, body: 'Forbidden' };
  }

  // ── POST: Incoming Messenger events ─────────────────────────────────────
  if (event.httpMethod === 'POST') {
    let body: FacebookWebhookPayload;
    try {
      body = JSON.parse(event.body ?? '{}') as FacebookWebhookPayload;
    } catch {
      console.error('[fb-webhook] Failed to parse request body');
      return { statusCode: 400, body: 'Bad Request' };
    }

    // Acknowledge IMMEDIATELY — Meta requires a response within 20 seconds.
    // Send replies asynchronously (fire-and-forget) so we never block.
    if (body.object === 'page') {
      for (const entry of body.entry ?? []) {
        for (const messagingEvent of entry.messaging ?? []) {
          if (messagingEvent.message && messagingEvent.sender?.id) {
            sendReply(messagingEvent.sender.id);
          }
        }
      }
    }

    return { statusCode: 200, body: 'EVENT_RECEIVED' };
  }

  // ── Other methods ────────────────────────────────────────────────────────
  return { statusCode: 405, body: 'Method Not Allowed' };
};

// ── Types ──────────────────────────────────────────────────────────────────
interface FacebookWebhookPayload {
  object: string;
  entry?: FacebookEntry[];
}

interface FacebookEntry {
  messaging?: FacebookMessagingEvent[];
}

interface FacebookMessagingEvent {
  sender?: { id: string };
  message?: { text?: string };
}
