"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CopyPlus, Plus, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageViewCarousel = ({ postImage }: { postImage: File[] }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const getBase64Data = (fileList: File[]) => {
    const files = fileList;

    if (files) {
      const imagePreviewsArray: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.readAsDataURL(file);

        reader.onload = () => {
          const base64Data = reader.result as string; // 'result' contains the base64 string
          imagePreviewsArray.push(base64Data);

          if (imagePreviewsArray.length === files.length) {
            setImagePreviews(imagePreviewsArray);
          }
        };
      }
    }
  };

  useEffect(() => {
    getBase64Data(postImage);
  }, [postImage]);

  return (
    <Carousel className="rounded-b-lg">
      <CarouselContent>
        {imagePreviews.length > 0 &&
          imagePreviews.map((item: string, index: number) => (
            <CarouselItem
              className="w-full h-[65vh] flex justify-center"
              key={index}
            >
              <Image
                src={item}
                alt="Post preview"
                className="object-cover h-[65vh] w-auto rounded-b-lg"
                height={100}
                width={100}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />

      <div className="absolute h-[100px] w-full  right-0 left-0 bottom-[10px] -translate-y-1/2">
        <div className="grid grid-cols-12 gap-1 mx-4 bg-background/80 rounded-lg">
          <div className="col-start-1 col-span-10 overflow-hidden ms-2">
            <div className="flex items-center overflow-x-auto h-full w-full  gap-2 flex-row-reverse">
              {imagePreviews &&
                imagePreviews.map((item: any, index: number) => (
                  <div className="relative flex-shrink-0 w-[90px]" key={index}>
                    <Image
                      src={item}
                      alt="Post preview"
                      className="object-cover h-[90px] w-[90px] bg-gray-200"
                      height={90}
                      width={90}
                    />
                    <button className="absolute top-1 right-1 bg-gray-800 rounded-full">
                      <XCircle />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-start-11 col-span-2 h-[100px] ">
            <button className="rounded-full h-[50px] w-[50px] border-slate-50/30 border-2 flex justify-center items-center">
              <Plus />
            </button>
          </div>
        </div>
      </div>

      <button className="absolute h-8 w-8 rounded-full bg-background/80 right-[18px] bottom-[0px] -translate-y-1/2">
        <CopyPlus className="ps-2" />
      </button>
    </Carousel>
  );
};

export default ImageViewCarousel;
