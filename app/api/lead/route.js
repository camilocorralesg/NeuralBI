import { NextResponse } from 'next/server';

let cachedAccessToken = null;
let tokenExpiresAt = 0;

/**
 * Retrieves a valid Zoho CRM OAuth Access Token using the Refresh Token.
 * Caches the access token in memory until it approaches expiration.
 */
async function getZohoAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && tokenExpiresAt > now + 60000) {
    return cachedAccessToken;
  }

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.com';

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Zoho CRM credentials are not configured in server environment.');
  }

  const tokenUrl = `${accountsUrl}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(`Failed to refresh Zoho token: ${JSON.stringify(data)}`);
  }

  cachedAccessToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in || 3600) * 1000;

  return cachedAccessToken;
}

/**
 * Handles POST requests from the Footer CTA form to insert leads into Zoho CRM.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // 2. Parse First and Last Name (Last Name is mandatory in Zoho CRM)
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];

    // 3. Obtain Access Token
    const accessToken = await getZohoAccessToken();
    const apiUrl = process.env.ZOHO_API_URL || 'https://www.zohoapis.com';

    // 4. Construct Zoho CRM Lead payload
    const leadRecord = {
      First_Name: firstName || undefined,
      Last_Name: lastName || 'Prospect',
      Email: email.trim(),
      Description: message && typeof message === 'string' ? message.trim() : undefined,
      Lead_Source: 'Website NeuralBI - CTA'
    };

    // 5. Send to Zoho CRM Leads Module (v6)
    const zohoRes = await fetch(`${apiUrl}/crm/v6/Leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [leadRecord],
        trigger: ['approval', 'workflow', 'blueprint']
      })
    });

    const zohoData = await zohoRes.json();

    if (!zohoRes.ok) {
      console.error('Zoho CRM API error:', zohoData);
      return NextResponse.json(
        { error: 'Failed to record lead in CRM', details: zohoData },
        { status: zohoRes.status }
      );
    }

    const firstResult = zohoData?.data?.[0];
    if (firstResult && firstResult.status === 'error') {
      console.error('Zoho CRM record rejected:', firstResult);
      return NextResponse.json(
        { error: firstResult.message, code: firstResult.code },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: firstResult?.details?.id
    });

  } catch (error) {
    console.error('Internal Lead Submission Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your inquiry.' },
      { status: 500 }
    );
  }
}
