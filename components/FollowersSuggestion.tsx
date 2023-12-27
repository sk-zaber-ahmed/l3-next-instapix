import React, { useState } from 'react';
import { FollowersSuggestionCard } from './FollowersSuggestionCard';
import { OwnProfilePage } from './OwnProfilePage';
import { fetchSuggestedUsers } from '@/lib/data';

const FollowersSuggestion = async() => {

    let loggedInUser="7e648dc6-f120-42e6-9c34-8cf366a63654"
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