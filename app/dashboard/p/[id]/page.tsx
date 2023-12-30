import React from 'react';

const SinglePostPage = ({params}:{params:{id:string}}) => {
    return (
        <div>
            <h1>Actual Post page show after refreshing {params.id}</h1> 
        </div>
    );
};

export default SinglePostPage;