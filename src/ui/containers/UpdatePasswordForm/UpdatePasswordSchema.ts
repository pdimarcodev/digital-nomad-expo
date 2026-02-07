import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string({ message: "Required field" }),
    newPassword: z
      .string({ message: "Required field" })
      .min(6, "At least 6 characters"),
    confirmNewPassword: z
      .string({ message: "Required field" })
      .min(6, "At least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
