import { z } from "zod";

export const signInSchema = z.object({
  phoneNumber: z.string().regex(/^(\+\d{12}|\d{10})$/, {
    message: "Please enter a valid Indian mobile number",
  }),

  tnc: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  otp: z
    .string()
    .length(4, { message: "OTP must be 4 digits" })
    .regex(/^\d{4}$/, { message: "OTP must contain only digits" }),
});
