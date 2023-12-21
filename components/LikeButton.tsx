import React from 'react';
import ActionIcon from './ActionIcon';
import { Heart } from 'lucide-react';
import { fakepost } from '@/lib/definitions';


interface Props {
    post: fakepost;
    userId: string;
}

const LikeButton = ({post,userId}:Props) => {
    return (
        <div>
            <ActionIcon>
                <Heart className="h-6 w-6"/>
            </ActionIcon>
        </div>
    );
};

export default LikeButton;