"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { pacifico } from "./fonts";
import AppCard from "./AppCard";
import { FacebookIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { authenticate } from "@/lib/actions";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [userData, dispatch] = useFormState(onSubmit, undefined);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(
    prevState: string | undefined,
    values: z.infer<typeof formSchema>
  ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    const postData = {
      grant_type: "password_username",
      username: values.email,
      password: values.password,
    };

    const data = await authenticate(postData);

    if (data) {
      router.replace("/dashboard");
    }
    return data;
  }

  return (
    <div className="mt-[110px]">
      <div className="border border-gray-200 px-6 py-8">
        <div className="mb-8">
          <h1
            className={`${pacifico.className} text-primary text-4xl font-bold text-center`}
          >
            InstaPix
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(dispatch)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-[12px]"
                      placeholder="Phone number, username or email"
                      {...field}
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
                      className="text-[12px]"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button className="w-full mt-4" type="submit">
                Log in
              </Button>
            </div>
          </form>
        </Form>

        <div className="flex justify-between items-center my-4">
          <Separator decorative className="w-1/3 border-1" />
          <h1>OR</h1>
          <Separator decorative className="w-1/3 border-1" />
        </div>

        <div className="mt-8 space-y-5">
          <div className="flex justify-center">
            <div className="bg-[#385185] p-1 rounded">
              <FacebookIcon color="white" size={18} />
            </div>
            <h1 className="text-[#385185] text-[14px] font-semibold  ml-2">
              Login with Facebook
            </h1>
          </div>
          <p className="text-center text-[13px] text-[#0095F7]">
            Forgot password?
          </p>
        </div>
      </div>

      <div className="border border-gray-200 px-6 py-4 mt-6 text-[14px]">
        <p className="text-center">
          Don&apos;t have account?
          <span className="text-[#0095F7]">Sign up</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <h1 className="text-[14px]">Get the app.</h1>
        <div className="flex space-x-2">
          <div>
            <AppCard></AppCard>
          </div>
          <div>
            <AppCard></AppCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
