"use client";

import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Form, useForm } from "react-hook-form";
import zod from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = zod.object({
  email: zod.string().email({
    message: "Please enter a valid email address.",
  }),
  password: zod.string().min(6, {
    message: "Password must be at least 6 characters.",
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
    },
  });

  async function onSubmit(
    prevState: string | undefined,
    values: zod.infer<typeof formSchema>
  ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    const postData = {
      grant_type: "password_username",
      username: values.email,
      password: values.password,
    };

    // const data = await authenticate(postData);

    // if (data) {
    //   router.replace("/dashboard");
    // }
    // return data;
    return "";
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(dispatch)} className="space-y-6">
        {/* <form action={dispatch} className="space-y-6"> */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
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
                <Input placeholder="* * * * * * " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
