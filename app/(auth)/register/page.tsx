import RegisterForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import React from "react";
import { roboto } from "@/components/fonts";

const Register = () => {
  return (
    <main className="flex flex-col gap-5 items-center justify-center h-screen bg-white text-black">
      <div className="relative mx-auto flex flex-col w-full max-w-[350px] space-y-2.5 p-4 gap-2 shadow-sm border-gray-300 border">
        <Image
          src={"/Instapix.svg"}
          alt={"logo"}
          width={150}
          height={150}
          className="self-center pt-5"
        />

        <p
          className={`text-center font-semibold text-[#737373] ${roboto.className}`}
        >
          Sign up to see photos and videos from your friends.
        </p>
        {/* <RegisterForm /> */}

        <Button className="text-primary font-bold bg-[#0095f6] hover:bg-[#0095f6]/90 gap-1 items-center w-3/4 self-center">
          <Facebook size={18} /> Log in with Facebook
        </Button>

        <div className="flex justify-around items-center my-4">
          <Separator decorative className="w-1/3 border-1 bg-gray-300 " />
          <p
            className={`text-sm font-semibold text-[#737373] ${roboto.className}`}
          >
            OR
          </p>
          <Separator decorative className="w-1/3 border-1 bg-gray-300 " />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[350px] flex-col space-y-2.5 p-4 gap-5 shadow-sm border-gray-300 border">
        <p className="text-sm text-center">
          Have an account?{" "}
          <Link className="text-[#0095f6] font-bold" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
