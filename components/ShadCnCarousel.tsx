//Ai carousel test kora lagbey aro
"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";


type props = {
    images: any;
};

const ShadCnCarousel = ({
    images,
}: props) => {






    return (
        <Carousel className="rounded-b-lg">
            <CarouselContent>
                {images.length > 0 &&
                    images.map((item: any, index: number) => (
                        <CarouselItem
                            className="w-full h-[65vh] flex justify-center"
                            key={index}
                        >
                            <Image
                                src={item?.Url}
                                alt="Post preview"
                                className="object-cover w-auto"
                                width={500}
                                height={500}
                            />
                        </CarouselItem>
                    ))}
            </CarouselContent>
            <CarouselPrevious className="left-5" />
            <CarouselNext className="right-5" />

        </Carousel>
    );
};

export default ShadCnCarousel;
