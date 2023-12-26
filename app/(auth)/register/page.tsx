import React from "react";
import RegisterForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { roboto } from "@/components/fonts";
import AppCard from "@/components/AppCard";

const Register = () => {
  return (
    <main className="flex flex-col gap-3 items-center justify-center h-screen bg-white text-black ">
      <div className=" flex flex-col w-full max-w-[340px] space-y-2.5 p-8 gap-2 shadow-sm border-[#dbdbdb] border md:mt-5">
        <Image
          src={"/Instapix.svg"}
          alt={"logo"}
          width={150}
          height={150}
          className="self-center pt-5"
        />

        <p
          className={`tracking-wide leading-5 text-center font-semibold text-[#737373] text-[16px] ${roboto.className}`}
        >
          Sign up to see photos and videos from your friends.
        </p>

        <Button className="gap-1" variant={"auth"} size={"auth"}>
          <Facebook size={16} /> Log in with Facebook
        </Button>

        <div className="flex justify-between items-center my-4">
          <Separator decorative className="w-2/5 border-1 bg-gray-300 " />
          <p className={`text-sm font-bold text-[#737373] ${roboto.className}`}>
            OR
          </p>
          <Separator decorative className="w-2/5 border-1 bg-gray-300 " />
        </div>
        <RegisterForm />
      </div>

      <div className="flex w-full max-w-[340px] flex-col space-y-2.5 p-4 md:h-[75px]  justify-center shadow-sm border-gray-300 border">
        <p className="text-sm text-center">
          Have an account?{" "}
          <Link className="text-[#0095f6] font-bold" href={"/login"}>
            Log in
          </Link>
        </p>
      </div>
      <div className="mt-2 flex flex-col items-center w-full max-w-[340px] space-y-2 p-1">
        <p className="">Get the app.</p>
        <div className="flex space-x-1">
          <div>
            <AppCard></AppCard>
          </div>
          <div>
            <AppCard></AppCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
