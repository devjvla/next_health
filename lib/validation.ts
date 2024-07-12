import { z } from "zod";

export const UserFormValidation = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().nonempty("Email address is required").email("Invalid email address"),
  phone: z.string().nonempty("Phone number is required").refine((phone) => /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/.test(phone), "Invalid phone number"),
});