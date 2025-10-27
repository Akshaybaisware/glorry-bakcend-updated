const https = require('https');

function sendViaResend({ from, to, subject, html }) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return reject(new Error('RESEND_API_KEY not set'));
    }

    // Prefer a verified sender for Resend (e.g., no-reply@yourdomain.com)
    const resendFrom = process.env.RESEND_FROM || from;
    const replyTo = process.env.RESEND_REPLY_TO || process.env.EMAIL;

    const payload = {
      from: resendFrom,
      to,
      subject,
      html
    };
    if (replyTo) {
      payload.reply_to = replyTo;
    }

    const data = JSON.stringify(payload);

    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ statusCode: res.statusCode, body });
        } else {
          const err = new Error(`Resend API error: ${res.statusCode}`);
          err.response = body;
          reject(err);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

module.exports = { sendViaResend };
