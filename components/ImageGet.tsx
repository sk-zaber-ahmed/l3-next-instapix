
// import { getImageUrl } from '@/lib/actions';
import React from 'react';

const ImageGet = async ({ images, imageIndex }: any) => {
    // const imageParsed=await getImageUrl(image);
    return (
        // <div style={{
        //     width: "100%",
        //     height: "100%",
        //     display: "flex",
        //     overflow: "hidden",
        //   }}>
        //     <img
        //     src="https://github.com/shadcn.png"
        //     alt={image}
        //     aria-hidden={imageIndex !== index}
        //     className="img-slider-img"
        //     style={{ translate: `${-100 * imageIndex}%` }}
        //   />
        // </div>

        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                overflow: "hidden",
            }}
        >
            {images?.map((image:any, index:any) => (
                <img
                    key={index}
                    src="https://github.com/shadcn.png"
                    alt={image}
                    aria-hidden={imageIndex !== index}
                    className="img-slider-img"
                    style={{ translate: `${-100 * imageIndex}%` }}
                />
                // <ImageGet key={index} image={image} imageIndex={imageIndex} index={index}></ImageGet>
            ))}
        </div>
    );
};

export default ImageGet;