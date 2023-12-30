import React from 'react';

type props = {
    id:string,
    post:any
}

const PostView = ({id, post}:props) => {
    return (
        <div>
            <h1>Post View</h1>
        </div>
    );
};

export default PostView;