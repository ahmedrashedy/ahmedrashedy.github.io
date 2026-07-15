import { Resend } from 'resend';

export interface Env {
  RESEND_API_KEY: string;
  FROM_EMAIL: string;
  TO_EMAIL: string;
  ALLOWED_ORIGIN: string;
}

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildCorsHeaders(env: Env): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function jsonResponse(
  body: unknown,
  status: number,
  corsHeaders: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

function renderHtml(payload: ContactPayload): string {
  const row = (label: string, value: string): string =>
    `<tr><td style="padding:10px 14px;border:1px solid #E2E8F0;background:#F8FAFC;font-weight:600;width:140px;color:#0B2545;">${label}</td><td style="padding:10px 14px;border:1px solid #E2E8F0;">${
      value ? escapeHtml(value) : '<span style="color:#94A3B8;">—</span>'
    }</td></tr>`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#0B2545;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
        <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#3DA5D9;margin-bottom:6px;">armmr-eg.com</div>
        <div style="font-size:20px;font-weight:600;">New project enquiry</div>
      </div>
      <div style="background:#ffffff;padding:24px;border:1px solid #E2E8F0;border-top:0;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
          ${row('Name', payload.name)}
          ${row('Email', payload.email)}
          ${row('Phone', payload.phone)}
          ${row('Company', payload.company)}
          ${row('Interested in', payload.interest)}
        </table>
        <div style="margin:0 0 8px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#64748B;font-weight:600;">Message</div>
        <div style="padding:14px;border-left:3px solid #3DA5D9;background:#F8FAFC;border-radius:6px;white-space:pre-wrap;line-height:1.6;color:#0B2545;">${escapeHtml(
          payload.message
        )}</div>
        <hr style="margin:24px 0;border:0;border-top:1px solid #E2E8F0;" />
        <p style="margin:0;font-size:12px;color:#64748B;">
          Reply directly to <strong style="color:#0B2545;">${escapeHtml(
            payload.email
          )}</strong> to respond. This message was sent from the contact form on armmr-eg.com.
        </p>
      </div>
    </div>
  </body>
</html>`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = buildCorsHeaders(env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ success: false, error: 'Method Not Allowed' }, 405, corsHeaders);
    }

    const origin = request.headers.get('Origin');
    if (origin && origin !== env.ALLOWED_ORIGIN) {
      return jsonResponse({ success: false, error: 'Origin not allowed' }, 403, corsHeaders);
    }

    if (!env.RESEND_API_KEY) {
      return jsonResponse(
        { success: false, error: 'Email service not configured. Set RESEND_API_KEY.' },
        500,
        corsHeaders
      );
    }

    try {
      const ct = request.headers.get('Content-Type') || '';
      let payload: ContactPayload;

      if (ct.includes('application/json')) {
        const body = (await request.json()) as Record<string, unknown>;
        payload = {
          name: String(body.name || '').trim(),
          email: String(body.email || '').trim(),
          phone: String(body.phone || '').trim(),
          company: String(body.company || '').trim(),
          interest: String(body.interest || '').trim(),
          message: String(body.message || '').trim(),
        };
      } else {
        const fd = await request.formData();
        const get = (k: string) => String(fd.get(k) || '').trim();
        payload = {
          name: get('name'),
          email: get('email'),
          phone: get('phone'),
          company: get('company'),
          interest: get('interest'),
          message: get('message'),
        };
      }

      if (!payload.name || !payload.email || !payload.message) {
        return jsonResponse(
          { success: false, error: 'Name, email, and message are required.' },
          400,
          corsHeaders
        );
      }

      if (!isValidEmail(payload.email)) {
        return jsonResponse({ success: false, error: 'Invalid email format.' }, 400, corsHeaders);
      }

      const resend = new Resend(env.RESEND_API_KEY);
      const subject = `New enquiry: ${payload.interest || 'General'} — ${payload.name}`;

      const { data, error } = await resend.emails.send({
        from: env.FROM_EMAIL,
        to: [env.TO_EMAIL],
        replyTo: payload.email,
        subject,
        html: renderHtml(payload),
      });

      if (error) {
        console.error('Resend error', error);
        return jsonResponse(
          { success: false, error: 'Email service rejected the request.' },
          502,
          corsHeaders
        );
      }

      return jsonResponse({ success: true, id: data?.id ?? null }, 200, corsHeaders);
    } catch (err) {
      console.error('Worker exception', err);
      return jsonResponse(
        { success: false, error: 'Unexpected server error.' },
        500,
        corsHeaders
      );
    }
  },
};
