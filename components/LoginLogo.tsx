import Image from "next/image";
import React from "react";
import loginImage from "../public/images/daniel-korpai-gPFrF6HPoNk-unsplash.jpg";
import loginImage2 from "../public/images/pro2.jpg";

import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

const LoginLogo = () => {
  return (
    <div className="relative -mt-[120px] min-h-[800px] overflow-hidden">
      <div className="absolute right-0 object-cover">
        <DeviceFrameset device="iPhone 8" color="black" zoom={0.65}>
          <Image
            src={loginImage2}
            alt="Pixelgram"
            // width={375}
            // height={300}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "100%",
              width: "100%",
            }}
          />
        </DeviceFrameset>
      </div>

      <div className="absolute -right-16 top-10 object-cover">
        <DeviceFrameset device="iPhone X" color="black" zoom={0.65}>
          <Image
            src={loginImage}
            alt="Pixelgram"
            // width={375}
            // height={300}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "100%",
              width: "100%",
            }}
          />
        </DeviceFrameset>
      </div>
    </div>
  );
};

export default LoginLogo;
