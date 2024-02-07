"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoTaskSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loading";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axios from "axios";

const AddTask = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [image, setImage] = useState("");

  const form = useForm<z.infer<typeof todoTaskSchema>>({
    mode: "onChange",
    resolver: zodResolver(todoTaskSchema),
    defaultValues: { title: "", description: "", status: false, imageUrl: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof todoTaskSchema>> = async (
    formData
  ) => {
    try {
      if (image) {
        console.log(image);
        const value = new FormData();
        value.set("file", image);

        const resp = await fetch("api/upload", {
          method: "POST",
          body: value,
        });
        console.log(resp);
      }
      const { data } = await axios.post(
        "http://localhost:5000/tasks",
        {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          imageUrl: image.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        router.push("/");
      }
    } catch (error: any) {
      setSubmitError(error.message);
      form.reset();
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="
          w-full
          flex
          justify-center
          items-center"
        >
          <Image src={Logo} alt="cypress Logo" width={50} height={50} />
          <span
            className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
          >
            To-Do.
          </span>
        </Link>
        <FormDescription
          className="
        text-foreground/60"
        >
          Add a new task
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Status</FormLabel>
                <FormDescription>Set the status of the task.</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          name="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? "Add" : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default AddTask;
