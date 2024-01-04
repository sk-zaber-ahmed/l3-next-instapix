"use client"
import { followingUser } from '@/lib/actions';
import React from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type props = {
    loggedInUser:any;
    suggestion:any;
}

const FollowButtonAction = ({loggedInUser,suggestion}:props) => {
    return (
        <div>
               {/* form client component in that we are using server action so that "use client" */}
                <form
                    action={async (formData: FormData) => {
                        const userToFollow = formData.get("userId");
                        //console.log(userToFollow)

                        await followingUser(loggedInUser, userToFollow);
                        toast.success("You are now follwoing him!")
                    }}
                >

                    <Button name="userId" value={suggestion?.userId} className="text-[#0095F6] text-[12px]" variant={"ghost"}>Follow</Button>
                </form>
        </div>
    );
};

export default FollowButtonAction;