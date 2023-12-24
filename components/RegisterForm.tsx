"use client";

import React from "react";
import { FormControl, FormField, FormItem, FormMessage, Form } from "./ui/form";
import { useForm } from "react-hook-form";
import zod from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/lib/actions";

const formSchema = zod.object({
  email: zod.string().email({
    message: "Please enter a valid email address.",
  }),
  username: zod.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: zod.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  mobileNumber: zod
    .string()
    .refine((value) => /^\+8801[0-9]{9}$/g.test(value), {
      message:
        "Please enter a valid Bangladesh mobile number starting with +8801.",
    }),
  fullName: zod.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
});
const RegisterForm = () => {
  const router = useRouter();
  const [userData, dispatch] = useFormState(onSubmit, undefined);

  // authenticate
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      mobileNumber: "",
      fullName: "",
    },
  });
  const disableSignupButton = () => {
    return (
      !form.getValues("fullName") ||
      !form.getValues("email") ||
      !form.getValues("username") ||
      !form.getValues("password") ||
      !form.getValues("mobileNumber")
    );
  };

  async function onSubmit(
    prevState: string | undefined,
    values: zod.infer<typeof formSchema>
  ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const data = await registerUser(values);

    if (data) {
      // router.replace("/dashboard");
      console.log("data:", data);
    }
    return data;
    return "";
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(dispatch)}
        className="space-y-3 flex flex-col"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  {...field}
                  className="bg-inherit text-[#737373] text-sm rounded-sm border border-gray-200 focus-visible:ring-0  focus-visible:ring-offset-1 ring-offset-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="bg-inherit text-[#737373] text-sm rounded-sm border border-gray-200 focus-visible:ring-0  focus-visible:ring-offset-1 ring-offset-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="bg-inherit text-[#737373] text-sm rounded-sm border border-gray-200 focus-visible:ring-0  focus-visible:ring-offset-1 ring-offset-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  className="bg-inherit text-[#737373] text-sm rounded-sm border border-gray-200 focus-visible:ring-0  focus-visible:ring-offset-1 ring-offset-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Mobile Number"
                  {...field}
                  className="bg-inherit text-[#737373] text-sm rounded-sm border border-gray-200 focus-visible:ring-0  focus-visible:ring-offset-1 ring-offset-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="text-primary font-bold bg-[#0095f6] hover:bg-[#0095f6]/90 w-full self-center"
          disabled={disableSignupButton()}
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
