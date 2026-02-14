export type UserRole = 'user' | 'admin';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}
