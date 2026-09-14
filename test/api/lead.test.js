import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, _resetTokenCache } from '../../app/api/lead/route.js';

describe('API Route: POST /api/lead', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    _resetTokenCache();
    process.env = {
      ...originalEnv,
      ZOHO_CLIENT_ID: 'mock_client_id',
      ZOHO_CLIENT_SECRET: 'mock_client_secret',
      ZOHO_REFRESH_TOKEN: 'mock_refresh_token',
      ZOHO_ACCOUNTS_URL: 'https://accounts.zoho.com',
      ZOHO_API_URL: 'https://www.zohoapis.com',
    };
  });

  const createRequest = (body) => ({
    json: async () => body,
  });

  it('rejects requests with missing or empty name', async () => {
    const req = createRequest({ name: '   ', email: 'alex@company.com', message: 'Hello' });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Name is required');
  });

  it('rejects requests with invalid email address', async () => {
    const invalidEmails = ['plainaddress', 'missing@domain', '@nodomain.com', 'user@.com'];

    for (const email of invalidEmails) {
      const req = createRequest({ name: 'Alex Rivera', email, message: 'Need BI audit' });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe('Valid email is required');
    }
  });

  it('returns 500 if Zoho environment credentials are not configured', async () => {
    delete process.env.ZOHO_CLIENT_ID;
    delete process.env.ZOHO_CLIENT_SECRET;
    delete process.env.ZOHO_REFRESH_TOKEN;

    const req = createRequest({
      name: 'Alex Rivera',
      email: 'alex@company.com',
      message: 'Hello',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe('An unexpected error occurred while processing your inquiry.');
  });

  it('successfully obtains Zoho token and creates a lead in Zoho CRM', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    // 1. Mock token refresh response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        access_token: 'mock_access_token_123',
        expires_in: 3600,
      }),
    });

    // 2. Mock Zoho CRM Leads create response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({
        data: [
          {
            code: 'SUCCESS',
            details: { id: '9876543210' },
            message: 'record added',
            status: 'success',
          },
        ],
      }),
    });

    const req = createRequest({
      name: 'Sarah Connor',
      email: 'sconnor@cyberdyne.com',
      message: 'Need urgent data pipeline migration',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.leadId).toBe('9876543210');

    // Verify Zoho CRM lead payload
    expect(mockFetch).toHaveBeenCalledTimes(2);
    const crmCall = mockFetch.mock.calls[1];
    expect(crmCall[0]).toBe('https://www.zohoapis.com/crm/v6/Leads');

    const bodySent = JSON.parse(crmCall[1].body);
    expect(bodySent.data[0]).toEqual({
      First_Name: 'Sarah',
      Last_Name: 'Connor',
      Email: 'sconnor@cyberdyne.com',
      Description: 'Need urgent data pipeline migration',
      Lead_Source: 'Website NeuralBI - CTA',
    });
  });

  it('correctly splits composite first names and last names', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'mock_token', expires_in: 3600 }),
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({
        data: [{ code: 'SUCCESS', details: { id: '445566' }, status: 'success' }],
      }),
    });

    const req = createRequest({
      name: 'Maria Del Carmen Rodriguez',
      email: 'maria@company.com',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    const crmCall = mockFetch.mock.calls[1];
    const bodySent = JSON.parse(crmCall[1].body);
    expect(bodySent.data[0].First_Name).toBe('Maria Del Carmen');
    expect(bodySent.data[0].Last_Name).toBe('Rodriguez');
  });

  it('handles single-word names correctly for Zoho CRM (mandatory Last_Name)', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'mock_token', expires_in: 3600 }),
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({
        data: [{ code: 'SUCCESS', details: { id: '112233' }, status: 'success' }],
      }),
    });

    const req = createRequest({
      name: 'Aristotle',
      email: 'aristotle@lyceum.org',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);

    const crmCall = mockFetch.mock.calls[1];
    const bodySent = JSON.parse(crmCall[1].body);
    expect(bodySent.data[0].First_Name).toBeUndefined();
    expect(bodySent.data[0].Last_Name).toBe('Aristotle');
  });

  it('reuses cached access token on subsequent requests without re-authenticating', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    // 1st request: token refresh + CRM lead create
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'cached_token_xyz', expires_in: 3600 }),
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({
        data: [{ code: 'SUCCESS', details: { id: '1' }, status: 'success' }],
      }),
    });

    await POST(createRequest({ name: 'Lead One', email: 'lead1@corp.com' }));
    expect(mockFetch).toHaveBeenCalledTimes(2);

    // 2nd request: token is cached, should ONLY call CRM lead create (1 call)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({
        data: [{ code: 'SUCCESS', details: { id: '2' }, status: 'success' }],
      }),
    });

    await POST(createRequest({ name: 'Lead Two', email: 'lead2@corp.com' }));
    expect(mockFetch).toHaveBeenCalledTimes(3); // 2 previous + 1 CRM call
    
    // Verify the Authorization header on the second CRM call uses the cached token
    const secondCrmCall = mockFetch.mock.calls[2];
    expect(secondCrmCall[1].headers.Authorization).toBe('Zoho-oauthtoken cached_token_xyz');
  });

  it('returns CRM error if Zoho rejects the record', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'mock_token', expires_in: 3600 }),
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        data: [
          {
            code: 'DUPLICATE_DATA',
            message: 'Lead already exists in CRM',
            status: 'error',
          },
        ],
      }),
    });

    const req = createRequest({
      name: 'Jane Doe',
      email: 'jane@existing.com',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Lead already exists in CRM');
    expect(data.code).toBe('DUPLICATE_DATA');
  });

  it('returns appropriate error if Zoho token refresh endpoint fails', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'invalid_client' }),
    });

    const req = createRequest({
      name: 'Alex Rivera',
      email: 'alex@company.com',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe('An unexpected error occurred while processing your inquiry.');
  });
});
