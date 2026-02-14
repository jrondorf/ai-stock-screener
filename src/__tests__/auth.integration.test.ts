import { type AddressInfo } from 'node:net';
import http, { type Server } from 'node:http';

import app from '../app';

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

    const registerResponse = await fetch(`http://127.0.0.1:${port}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'Password1!' })
    });

    expect(registerResponse.status).toBe(201);

    const setCookie = registerResponse.headers.get('set-cookie');
    expect(setCookie).toContain('refreshToken=');

    const refreshResponse = await fetch(`http://127.0.0.1:${port}/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: setCookie ?? ''
      }
    });

    expect(refreshResponse.status).toBe(200);

    const logoutResponse = await fetch(`http://127.0.0.1:${port}/auth/logout`, {
      method: 'POST',
      headers: {
        cookie: setCookie ?? ''
      }
    });

    expect(logoutResponse.status).toBe(200);
  });
});
