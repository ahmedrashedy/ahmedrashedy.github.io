# armmr-eg.com Contact Worker

Cloudflare Worker that handles `POST` submissions from the contact form on [armmr-eg.com](https://armmr-eg.com) and forwards them as a formatted HTML email via the [Resend](https://resend.com) API.

## Why this exists

The static site on GitHub Pages cannot run server-side code, so we cannot call Resend directly from the browser (would leak the API key). A Cloudflare Worker gives us a tiny serverless endpoint with a free quota of 100,000 requests/day.

## Architecture

```
User submits form on https://armmr-eg.com/#contact
                  │
                  ▼
   Browser (fetch with mode: "cors")
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
  CORS check         Cloudflare Worker
  (Origin must be        (api.armmr-eg.workers.dev)
   https://armmr-eg.com)         │
                                  ▼
                          Resend API
                                  │
                                  ▼
                   ahmedrashedy001@gmail.com
```

## Local development

```bash
cd worker
npm install
cp .dev.vars.example .dev.vars       # edit with your real keys
npm run dev                          # runs at http://localhost:8787
```

Send a test request:

```bash
curl -X POST http://localhost:8787 \
  -H "Origin: https://armmr-eg.com" \
  -F "name=Test" -F "email=test@example.com" -F "message=Hello" \
  -F "interest=Pre-Sales & Scoping"
```

## Deploy

### 1. Login to Cloudflare (one-time)

```bash
npx wrangler login
```

This opens a browser window to authorize Wrangler against your Cloudflare account.

### 2. Set the Resend API key as a secret (never commit it)

```bash
npx wrangler secret put RESEND_API_KEY_AHMED_RASHEDY
# paste your `re_xxxxxxxxxx` key when prompted
```

### 3. (Optional) Verify a sending domain in Resend

By default the worker uses `from = onboarding@resend.dev`, which only delivers to the email you signed up with. For better deliverability and to send from `armmr-eg.com`:

1. In Resend dashboard → Domains → Add `armmr-eg.com`
2. Add the DKIM, SPF, and MX records Resend shows you (in your DNS provider)
3. Click "Verify"
4. Update `FROM_EMAIL` in `wrangler.toml` to `Ahmed Rashedy <hello@armmr-eg.com>`

### 4. Deploy

```bash
npm run deploy
```

Wrangler prints the worker URL, e.g.:

```
Published armmr-eg-contact-form
  https://armmr-eg-contact-form.<your-account>.workers.dev
```

### 5. (Optional) Attach to a custom subdomain

In the Cloudflare dashboard → Workers → your worker → Settings → Triggers → Custom Domains → add `api.armmr-eg.com`.

## Configuration reference

Set via `wrangler.toml` `[vars]` (committed) or `wrangler secret put` (private):

| Name | Visibility | Example | Purpose |
|---|---|---|---|
| `RESEND_API_KEY_AHMED_RASHEDY` | **secret** | `re_abc...` | Resend API key (server only) |
| `FROM_EMAIL` | var | `Ahmed Rashedy <onboarding@resend.dev>` | Sender shown to recipient |
| `TO_EMAIL` | var | `ahmedrashedy001@gmail.com` | Inbox that receives submissions |
| `ALLOWED_ORIGIN` | var | `https://armmr-eg.com` | CORS allow-list (single origin) |

## Endpoints

| Method | Path | Behavior |
|---|---|---|
| `OPTIONS` | `/` | CORS preflight — returns 204 |
| `POST` | `/` | Accepts `application/json` or `multipart/form-data`, sends email |
| Other | `/` | 405 Method Not Allowed |

## Response shape

```json
{ "success": true, "id": "abc-123" }            // 200 OK
{ "success": false, "error": "..." }            // 4xx / 5xx
```

## Notes

- The static site uses `import.meta.env.PUBLIC_CONTACT_API_URL` to know where to POST. After deploying, set this in your GitHub Actions secrets (or wherever you build) to the worker URL.
- Spam protection: this worker does rate limiting or CAPTCHA. If spam becomes an issue, add Cloudflare Turnstile or simple IP-based rate limiting.
- Logs: `npm run tail` to stream live request logs from Cloudflare.
