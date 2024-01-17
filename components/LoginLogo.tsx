import Image from "next/image";
import React from "react";
import loginImage from "../public/images/login-page-image.png";
// import loginImage from "../public/images/daniel-korpai-gPFrF6HPoNk-unsplash.jpg";
import loginImage2 from "../public/images/pro2.jpg";

import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

const LoginLogo = () => {
  return (
    <div className="h-full flex items-center justify-end">
      <Image
        className="w-[74%] xl:w-[65%] 2xl:w-[50%]"
        src={loginImage}
        alt="Pixelgram"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      {/* <div className="absolute right-0 bottom-0 object-cover h-full">
        <DeviceFrameset device="iPhone 8" color="black" zoom={0.6}>
          <Image
            src={loginImage2}
            alt="Pixelgram"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "100%",
              width: "100%",
            }}
          />
        </DeviceFrameset>
      </div>

      <div className="absolute -right-16 -bottom-10 object-cover h-full">
        <DeviceFrameset device="iPhone X" color="black" zoom={0.6}>
          <Image
            src={loginImage}
            alt="Pixelgram"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "100%",
              width: "100%",
            }}
          />
        </DeviceFrameset>
      </div> */}
    </div>
  );
};

export default LoginLogo;
