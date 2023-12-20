"use client";
import React, { useState } from 'react';
import { FollowersSuggestionCard } from './FollowersSuggestionCard';

const FollowersSuggestion = () => {
    const [suggestions,setSuggestions] = useState([1,2,3,4,5,6])
    return (
        <div>
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