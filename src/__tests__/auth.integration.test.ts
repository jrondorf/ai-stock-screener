import { type AddressInfo } from 'node:net';
import http, { type Server } from 'node:http';

import app from '../app';

const extractCookieValue = (setCookie: string | null, name: string): string | null => {
  if (!setCookie) {
    return null;
  }

  const match = setCookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
};

describe('Auth routes', () => {
  let server: Server;

  beforeAll(async () => {
    server = http.createServer(app);
    await new Promise<void>((resolve) => {
      server.listen(0, resolve);
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it('registers, refreshes and logs out a user', async () => {
    const { port } = server.address() as AddressInfo;
    const csrfSeedResponse = await fetch(`http://127.0.0.1:${port}/health`);
    const csrfSeedCookie = csrfSeedResponse.headers.get('set-cookie');
    const csrfToken = extractCookieValue(csrfSeedCookie, 'csrfToken');
    const csrfSecret = extractCookieValue(csrfSeedCookie, '_csrf');
    expect(csrfToken).toBeTruthy();
    expect(csrfSecret).toBeTruthy();
    const csrfCookieHeader = `csrfToken=${csrfToken ?? ''}; _csrf=${csrfSecret ?? ''}`;

    const registerResponse = await fetch(`http://127.0.0.1:${port}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: csrfSeedCookie ?? '',
        'x-csrf-token': csrfToken ?? ''
      },
      body: JSON.stringify({ email: 'user@example.com', password: 'Password1!' })
    });

    expect(registerResponse.status).toBe(201);

    const setCookie = registerResponse.headers.get('set-cookie');
    expect(setCookie).toContain('refreshToken=');
    const refreshToken = extractCookieValue(setCookie, 'refreshToken');
    expect(refreshToken).toBeTruthy();
    const requestCsrfToken = extractCookieValue(setCookie, 'csrfToken') ?? csrfToken;
    const requestCsrfSecret = extractCookieValue(setCookie, '_csrf') ?? csrfSecret;
    const authCookieHeader = `csrfToken=${requestCsrfToken ?? ''}; _csrf=${requestCsrfSecret ?? ''}; refreshToken=${refreshToken ?? ''}`;

    const refreshResponse = await fetch(`http://127.0.0.1:${port}/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: authCookieHeader,
        'x-csrf-token': requestCsrfToken ?? ''
      }
    });

    expect(refreshResponse.status).toBe(200);

    const logoutResponse = await fetch(`http://127.0.0.1:${port}/auth/logout`, {
      method: 'POST',
      headers: {
        cookie: authCookieHeader,
        'x-csrf-token': requestCsrfToken ?? ''
      }
    });

    expect(logoutResponse.status).toBe(200);
  });
});
