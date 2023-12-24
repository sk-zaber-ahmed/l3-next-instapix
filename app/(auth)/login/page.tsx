import LoginForm from "@/components/LoginForm";
import LoginLogo from "@/components/LoginLogo";
import React from "react";
import { links } from "@/lib/links";

const Login = () => {
  return (
    <div className="">
      <div className="grid grid-cols-11 lg:grid-cols-12 gap-4 h-fit">
        <div className="hidden lg:block lg:col-start-2 lg:col-span-5">
          <LoginLogo />
        </div>

        <div className="2xl:col-start-7 2xl:col-span-3 lg:col-start-7 lg:col-span-4 col-start-4 col-span-5 align-center content-center">
          <LoginForm />
        </div>
      </div>

      <div className="flex justify-center flex-wrap">
        {links?.map((link) => (
          <p
            key={link.label}
            className="text-sm text-gray-500 dark:text-gray-400 ml-4 mt-2 ${index !== 0 ? 'md:ml-6' : ''}`}"
          >
            {link.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Login;
