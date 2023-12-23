import React, { useState } from 'react';
import { FollowersSuggestionCard } from './FollowersSuggestionCard';
import { OwnProfilePage } from './OwnProfilePage';
import { fetchSuggestedUsers } from '@/lib/data';

const FollowersSuggestion = async() => {

    let loggedInUser="fdd29cd4-bde4-4b11-9557-2a41241cf2c2"
    const suggestedUser= await fetchSuggestedUsers(loggedInUser);
    
    return (
        <div>
            <OwnProfilePage></OwnProfilePage>

            <div className='flex justify-between mb-4 lg:w-[350px]'>
                <h1 className='text-[14px] text-gray-400 font-bold'>Suggested for you</h1>
                <h1 className='text-[13px]'>See All</h1>
            </div>
            {
                suggestedUser?.suggestions?.map((suggestion:any,index:any)=>(
                    <div key={index}>
                        <FollowersSuggestionCard suggestion={suggestion}></FollowersSuggestionCard>
                    </div>
                ))
            }
        </div>
    );
};

export default FollowersSuggestion;