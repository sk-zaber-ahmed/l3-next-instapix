"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { pacifico } from './fonts';
import AppCard from './AppCard';

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})


const LoginForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className=' h-full'>
            <div className='border border-gray-200 px-6 py-8 rounded'>
                <div className='mb-8'>
                    <h1 className={`${pacifico.className} text-primary text-4xl font-bold text-center`}>InstaPix</h1>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Phone number, username or email" {...field} />
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
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='w-full mt-8' type="submit">Login in</Button>
                    </form>
                </Form>

                <div className="flex justify-between items-center my-4">
                    <Separator decorative className="w-1/3 border-1" />
                    <h1>OR</h1>
                    <Separator decorative className="w-1/3 border-1" />
                </div>

                <div className="mt-8 space-y-5">
                    <div className='flex justify-center'>
                        <h1 className='mr-4'>Logo</h1>
                        <h1>Login with Facebook</h1>
                    </div>
                    <p className='text-center'>Forgot password?</p>
                </div>
            </div>

            {/* sign up */}
            <div className='border border-gray-200 px-6 py-4 rounded mt-6'>
                <p className='text-center'>Don't have account? <span>Sign up</span></p>
            </div>

            <div className='mt-6 flex flex-col items-center'>
                <h1>Get the app</h1>
                <div className='flex space-x-2'>
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
