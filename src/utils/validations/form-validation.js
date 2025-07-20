import { z } from "zod";

const userSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Profile picture must be less than 2MB",
    })
    .optional(),
  firstName: z
    .string()
    .min(2, { message: "First name is required" })
    .max(25, { message: "First name must not exceed 25 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(25, { message: "Last name must not exceed 25 characters" }),
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

const { phone, firstName, lastName } = userSchema.shape;

export const passengerSchema = z.object({
  firstName,
  lastName,
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

const registerSchema = z.object({
  phone,
  firstName,
  lastName,

  tnc: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  otp: z
    .string()
    .length(5, { message: "OTP must be 5 digits" })
    .regex(/^\d{5}$/, { message: "OTP must contain only digits" }),
});

export const registerNameSchema = registerSchema.pick({
  firstName: true,
  lastName: true,
});

export const signInOTPSchema = registerSchema.pick({
  otp: true,
});

export const signInPhoneSchema = registerSchema.pick({
  phone: true,
  tnc: true,
});
