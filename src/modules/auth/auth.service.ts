import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env';
import { type LoginInput, type RegisterInput, type UserRecord } from './auth.types';

interface AuthResponse {
  user: Pick<UserRecord, 'id' | 'email' | 'role'>;
  accessToken: string;
  refreshToken: string;
}

const usersByEmail = new Map<string, UserRecord>();
const refreshTokenHashByUserId = new Map<string, string>();

const hashToken = (token: string): string =>
  crypto.createHash('sha256').update(token).digest('hex');

const createAccessToken = (user: UserRecord): string =>
  jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.jwtAccessSecret, {
    expiresIn: '15m'
  });

const createRefreshToken = (user: UserRecord): string =>
  jwt.sign({ sub: user.id }, env.jwtRefreshSecret, { expiresIn: '7d' });

const sanitizeUser = (user: UserRecord): Pick<UserRecord, 'id' | 'email' | 'role'> => ({
  id: user.id,
  email: user.email,
  role: user.role
});

export class AuthService {
  public async register(input: RegisterInput): Promise<AuthResponse> {
    if (usersByEmail.has(input.email)) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user: UserRecord = {
      id: crypto.randomUUID(),
      email: input.email,
      passwordHash,
      role: input.role ?? 'user'
    };

    usersByEmail.set(user.email, user);

    return this.issueTokens(user);
  }

  public async login(input: LoginInput): Promise<AuthResponse> {
    const user = usersByEmail.get(input.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    return this.issueTokens(user);
  }

  public async refresh(refreshToken: string): Promise<AuthResponse> {
    const payload = jwt.verify(refreshToken, env.jwtRefreshSecret) as { sub: string };
    const user = Array.from(usersByEmail.values()).find((candidate) => candidate.id === payload.sub);
    if (!user) {
      throw new Error('Invalid token');
    }

    const expectedHash = refreshTokenHashByUserId.get(user.id);
    if (!expectedHash || expectedHash !== hashToken(refreshToken)) {
      throw new Error('Invalid token');
    }

    return this.issueTokens(user);
  }

  public async logout(refreshToken: string): Promise<void> {
    const payload = jwt.decode(refreshToken) as { sub?: string } | null;
    if (!payload?.sub) {
      return;
    }

    refreshTokenHashByUserId.delete(payload.sub);
  }

  private issueTokens(user: UserRecord): AuthResponse {
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    refreshTokenHashByUserId.set(user.id, hashToken(refreshToken));

    return {
      user: sanitizeUser(user),
      accessToken,
      refreshToken
    };
  }
}

export const authService = new AuthService();
