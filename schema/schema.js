import { z } from "zod";

export const verifySchema = z.object({
  patientno: z
    .string({
      invalid_type_error: "Hospital No. is required",
      required_error: "Hospital No. is required",
    })
    .trim()
    .nonempty({ message: "Hospital No. is required" })
    .min(5, { message: "Hospital No. must be at least 5 characters" }),

  lastname: z
    .string({
      required_error: "Last Name is required",
    })
    .trim()
    .nonempty({ message: "Last Name is required" }),

  birthdate: z
    .string({
      invalid_type_error: "Birthdate is required",
      required_error: "Birthdate is required",
    })
    .trim()
    .nonempty({ message: "Birthdate is required" })
    .min(10, { message: "Birthdate must be in MM/DD/YYYY format" }),
});
