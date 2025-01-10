import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email("Invalid email address"),
});
export const UserReadSchema = z.object({
  userId: z.string().uuid("Invalid UUID"),
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email("Invalid email address"),
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]),
});
export const SigninResponseSchema = z.object({
  token: z.string(),
  userId: z.string().uuid("Invalid UUID"),
  name: z.string().min(1, "Name cannot be empty"),
});

export type SigninResponse = z.infer<typeof SigninResponseSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;
export type ProfileFormValues = z.infer<typeof ProfileSchema>;
export type UserRead = z.infer<typeof UserReadSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;