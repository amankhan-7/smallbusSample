import { z } from "zod";

export const signInSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .regex(/^\+?[1-9][0-9]{7,14}$/),
  tnc: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});