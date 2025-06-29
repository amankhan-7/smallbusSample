import { z } from "zod";

const signInSchema = z.object({
  phone: z.string().regex(/^(\+\d{12}|\d{10}|0\d{10})$/, {
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
export const signInOTPSchema = signInSchema.pick({
  otp: true,
});

export const signInPhoneSchema = signInSchema.pick({
  phone: true,
  tnc: true,
});

const userSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Profile picture must be less than 2MB",
    })
    .optional(),
  fullname: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(50, { message: "Full name must not exceed 50 characters" }),
  phone: z
    .string()
    .regex(/^(\+\d{12}|\d{10}|0\d{10})$/, {
      message: "Please enter a valid Indian mobile number",
    })
    .readonly(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must not exceed 100 characters" })
    .optional()
    .or(z.literal("")),
});

export const accountDetailSchema = userSchema.omit({
  profilePicture: true,
});

export const userProfilePictureSchema = userSchema.pick({
  profilePicture: true,
});

// Reuse phone from userSchema in Passenger Schema
const { phone } = userSchema.shape;

export const passengerSchema = z.object({
  firstName: z
    .string()
    .max(25, { message: "First name must not exceed 50 characters" })
    .min(2, { message: "First name is required" }),
  lastName: z
    .string()
    .max(25, { message: "Last name must not exceed 50 characters" })
    .min(1, { message: "Last name is required" }),
  email: z
  .string()
  .email({ message: "Please enter a valid email address" })
  .max(100, { message: "Email must not exceed 100 characters" }),

  age: z.coerce.number().min(1, "Age must be a positive number"),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Select a valid gender" }),
  }),
  phone,
});
