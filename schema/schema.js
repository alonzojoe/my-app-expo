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
