import { z } from 'zod';

export const userErrorSchema = {
  min: 'Username is too short, must be at least 4 characters.',
  max: 'Username is too long, must not exceed 32 characters',
};

export const emailErrorSchema = {
  email: 'Please use a valid email address',
};

export const passErrorSchema = {
  match: 'Passwords must match',
  min: 'Minimum 8 characters',
  max: 'Maximum 32 characters',
  lowercase: 'At least one lowercase letter',
  uppercase: 'At least one uppercase letter',
  number: 'At least on number',
  spec: 'At least one of the following:<br>!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~,?]+',
};
export const passwordSchema = z
  .string()
  .min(8, passErrorSchema.min)
  .max(32, passErrorSchema.max)
  .regex(/[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~,?]+/, passErrorSchema.spec)
  .regex(/[a-z]+/, passErrorSchema.lowercase)
  .regex(/[A-Z]+/, passErrorSchema.uppercase)
  .regex(/\d+/, passErrorSchema.number);

const usernameSchema = z
  .string()
  .min(8, userErrorSchema.min)
  .max(32, userErrorSchema.max);

const emailSchema = z.string().email(emailErrorSchema.email);

export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    { path: ['confirmPassword'], message: passErrorSchema.match }
  );
export type RegisterSchema = z.infer<typeof registerSchema>;
