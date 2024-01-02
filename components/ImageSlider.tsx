"use client";
import { useState } from "react";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Circle,
  CircleDot,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import ImageGet from "./ImageGet";
import Image from "next/image";

type ImageSliderProps = {
  images: string[];
  multiImage: any;
};

export function ImageSlider({ images, multiImage }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);
  //console.log(images)
  //console.log('each user post image', multiImage[0]?.Url)

  // Shimmer loader for images
  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="3s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images?.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  return (
    <section
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <a href="#after-image-slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {multiImage?.map((image: any, index: number) => (
          // <img
          //   key={index}
          //   src={image?.Url}
          //   alt={image}
          //   aria-hidden={imageIndex !== index}
          //   className="img-slider-img"
          //   style={{ translate: `${-100 * imageIndex}%` }}
          // />

          <Image
            key={index}
            src={image?.Url}
            alt={image}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ translate: `${-100 * imageIndex}%` }}
            width={500}
            height={500}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />

          //   <img
          //   key={index}
          //   src={parsed?.Url}
          //   alt={image}
          //   aria-hidden={imageIndex !== index}
          //   className="img-slider-img"
          //   style={{ translate: `${-100 * imageIndex}%` }}
          // />
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <ChevronLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ChevronRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images?.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  );
}
