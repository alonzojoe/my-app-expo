import { z } from "zod";

export const verifySchema = z.object({
  patientno: z
    .string()
    .min(5)
    .nonempty({ message: "Hospital No. is required!" }),
  lastname: z.string().trim().nonempty({ message: "Last Name is required" }),
  birthdate: z
    .string()
    .trim()
    .min(10)
    .nonempty({ message: "Last Name is required" }),
});
