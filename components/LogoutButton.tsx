"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/actions";

const LogoutButton = () => {
    const router = useRouter();
    return (
        <form
          action={async () => {
            // console.log("logout calling");
            await logoutUser();
            router.replace("/login");
          }}
        >
          <Button className="text-[#0095F6] text-[12px]" variant={"ghost"}>
            Logout
          </Button>
        </form>
    );
};

export default LogoutButton;