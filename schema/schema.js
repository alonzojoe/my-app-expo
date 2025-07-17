import { z } from "zod";

export const verifySchema = z.object({
  patientno: z
    .number({
      required_error: "Hospital No. is required!",
      invalid_type_error: "Hospital No. must be a number",
    })
    .min(5, { message: "Hospital No. must be at least 5 digits" }),
  lastname: z.string().trim().nonempty({ message: "Last Name is required" }),
  birthdate: z
    .string()
    .trim()
    .min(10)
    .nonempty({ message: "Last Name is required" }),
});
