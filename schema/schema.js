import { z } from "zod";

export const verifySchema = z.object({
  patientno: z
    .string({
      invalid_type_error: "is required*",
      required_error: "is required*",
    })
    .trim()
    .nonempty({ message: "is required*" })
    .min(5, { message: "must be at least 5 characters*" }),

  lastname: z
    .string({
      required_error: "is required*",
    })
    .trim()
    .nonempty({ message: "is required*" }),

  birthdate: z
    .string({
      invalid_type_error: "is required*",
      required_error: "is required*",
    })
    .trim()
    .nonempty({ message: "is required" })
    .min(10, { message: "invalid format*" }),
});

export const qrVerifySchema = z.object({
  birthdate: z
    .string({
      invalid_type_error: "is required*",
      required_error: "is required*",
    })
    .trim()
    .nonempty({ message: "is required" })
    .min(10, { message: "invalid format*" }),
});

export const eappointmentForm = z.object({
  mainPhone: z
    .string({
      required_error: "Phone number is required*",
      invalid_type_error: "Phone number is required*",
    })
    .trim()
    .nonempty({ message: "Phone number is required*" })
    .regex(/^9\d{9}$/, {
      message: "Phone must start with 9 and be 10 digits*",
    }),
  phone: z
    .string({
      required_error: "Alternate phone number is required*",
      invalid_type_error: "Alternate phone number is required*",
    })
    .trim()
    .nonempty({ message: "Alternate phone number is required*" })
    .regex(/^9\d{9}$/, {
      message: "Phone must start with 9 and be 10 digits*",
    }),

  complaints: z
    .string({
      required_error: "Chief complaint is required*",
    })
    .trim()
    .nonempty({ message: "Chief complaint is required*" }),
});

export const eskedSchema = z.object({
  mainPhone: z
    .string({
      required_error: "Phone number is required*",
      invalid_type_error: "Phone number is required*",
    })
    .trim()
    .nonempty({ message: "Phone number is required*" })
    .regex(/^9\d{9}$/, {
      message: "Phone must start with 9 and be 10 digits*",
    }),
  phone: z
    .string({
      required_error: "Alternate phone number is required*",
      invalid_type_error: "Alternate phone number is required*",
    })
    .trim()
    .nonempty({ message: "Alternate phone number is required*" })
    .regex(/^9\d{9}$/, {
      message: "Phone must start with 9 and be 10 digits*",
    }),
  guardian: z.string(),
  consultation: z
    .string({
      required_error: "This field is required.*",
    })
    .trim()
    .nonempty({ message: "This field is required.*" }),
  month: z
    .string({
      required_error: "This field is required.*",
    })
    .trim()
    .nonempty({ message: "This field is required.*" }),
  experience: z
    .string({
      required_error: "This field is required.*",
    })
    .trim()
    .nonempty({ message: "This field is required.*" }),
});
