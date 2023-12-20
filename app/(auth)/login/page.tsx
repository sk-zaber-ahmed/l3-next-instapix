import LoginForm from "@/components/LoginForm";
import LoginLogo from "@/components/LoginLogo";
import React from "react";
import { links } from "@/lib/links";

const Login = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[100px] lg:mx-[250px]">
        <div className="hidden lg:block grid-cols-1">
          <LoginLogo />
        </div>
        <div className="lg:col-span-1 grid-cols-1">
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
