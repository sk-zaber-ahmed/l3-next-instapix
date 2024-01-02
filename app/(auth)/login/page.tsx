import LoginForm from "@/components/LoginForm";
import LoginLogo from "@/components/LoginLogo";
import React from "react";
import { links } from "@/lib/links";

const Login = () => {
  return (
    <div className="">
      <div className="grid grid-cols-12 md:grid-cols-11 lg:grid-cols-12 gap-4 h-[86dvh] items-center">
        <div className="hidden lg:block lg:col-start-2 lg:col-span-5 h-full">
          <LoginLogo />
        </div>

        <div className="col-start-1 col-span-12 md:col-start-4 md:col-span-5 lg:col-start-7 lg:col-span-4 2xl:col-start-7 2xl:col-span-3 align-center content-center">
          <LoginForm />
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-3 h-[12dvh]">
        {links?.map((link) => (
          <p
            key={link.label}
            className="text-sm text-gray-500 dark:text-gray-400 ${index !== 0 ? 'md:ml-6' : ''}`}"
          >
            {link.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Login;
