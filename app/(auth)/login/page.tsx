import LoginForm from '@/components/LoginForm';
import LoginLogo from '@/components/LoginLogo';
import React from 'react';

const Login = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-6 mx-6 lg:mx-[300px]'>
            <div className="hidden lg:block">
                <LoginLogo />
            </div>
            <div className="lg:col-span-1" >
                <LoginForm />
            </div>

        </div>
    );
};

export default Login;