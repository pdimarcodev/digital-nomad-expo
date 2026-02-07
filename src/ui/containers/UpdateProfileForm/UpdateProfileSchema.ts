import { z } from "zod";

export const updateProfileSchema = z.object({
  fullname: z
    .string({ message: "Required field" })
    .min(5, "Name too short"),
  email: z.string({ message: "Required field" }).email("Invalid email"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
