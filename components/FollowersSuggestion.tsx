"use client";
import React, { useState } from 'react';
import { FollowersSuggestionCard } from './FollowersSuggestionCard';
import { OwnProfilePage } from './OwnProfilePage';

const FollowersSuggestion = () => {
    const [suggestions,setSuggestions] = useState([1,2,3,4,5,6])
    return (
        <div>
            <OwnProfilePage></OwnProfilePage>

            <div className='flex justify-between mb-4 lg:w-[350px]'>
                <h1 className='text-[14px] text-gray-400 font-bold'>Suggested for you</h1>
                <h1 className='text-[13px]'>See All</h1>
            </div>
            {
                suggestions?.map((suggestion,index)=>(
                    <div key={index}>
                        <FollowersSuggestionCard ></FollowersSuggestionCard>
                    </div>
                ))
            }
        </div>
    );
};

export default FollowersSuggestion;