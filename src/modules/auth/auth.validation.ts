import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(['user', 'admin']).optional()
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
});
