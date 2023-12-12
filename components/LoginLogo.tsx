import Image from 'next/image';
import React from 'react';
import loginImage from '../public/images/daniel-korpai-gPFrF6HPoNk-unsplash.jpg';

const LoginLogo = () => {
    return (
        <div>
            <Image
                src={loginImage}
                alt="Pixelgram"
               
                className="rounded-lg"
            />
        </div>
    );
};

export default LoginLogo;