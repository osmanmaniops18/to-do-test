import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(6, "Password is required"),
});

export const todoTaskSchema = z.object({
  title: z.string().min(4, "Title is required"),
  description: z.string().min(10, "Description is Required"),
  status: z.boolean(),
  imageUrl: z.string().optional(),
});
