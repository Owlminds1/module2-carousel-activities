"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SlideData from "@/carousle-C13-L3-A2-2B/slideData.json";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Swiper as SwiperClass } from "swiper";
import EmotionBar from "./emotionBar";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

type SlideProps = {
  setIsFirstScreen: (value: string) => void;
};
export default function C13L1A2Slide({ setIsFirstScreen }: SlideProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [lastSlide, setLastSlide] = useState<number>(0);
  const [shuffle,setShuffle]=useState(SlideData)
  useEffect(()=>{
setShuffle((prev)=>[...prev].sort(()=>Math.random() - .5 ))
  },[])

  const handleNext = () => {
    if (lastSlide == SlideData.length - 1) {
      setIsFirstScreen("emotionImage");
    }
    swiperRef.current?.slideNext();
  };

  const handlePerv = () => {
    if (lastSlide == 0) return;
    swiperRef.current?.slidePrev();
  };

  const handleChange = (swipe: SwiperClass) => {
    setLastSlide(swipe.activeIndex);
  };
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-[80%] flex justify-center items-center flex-col  px-2">
      <div className="w-full">
          <h1 className="text-center text-3xl py-4 text-black capitalize">
          Lets review emotions!
        </h1>
        <Swiper
          slidesPerView={1}
          loop={false}
          autoplay={false}
          allowTouchMove={false}
          modules={[Navigation]}
          onSlideChange={handleChange}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {shuffle.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-12  bg-white shadow-md  overflow-hidden p-3  w-full">
                <div className="col-span-8 relative p-3  w-full  flex justify-center items-center flex-col gap-2   rounded-lg">
                 <div className="w-[500px] h-[300px]  relative">
                   <Image
                    src={item.img}
                    className="rounded-lg object-contain"
                    fill
                    alt="slider image"
                  />
                 </div>
                  <h2
                    className={` w-[80%] text-black font-bold
                       text-center text-lg  rounded-lg  `}
                  >
                    {item.text}
                  </h2>
                </div>
                <div className="col-span-4 w-full ">
                  <EmotionBar item={item.answer} />
                </div>
              </div>
            </SwiperSlide>
          ))}

            </Swiper>
      </div>
          <div className=" py-4 flex items-center justify-between w-full text-black">
            <div
              className={` ${lastSlide > 0 ? "border border-black rounded-full p-3 shadow-inner shadow-[#000000b9] bg-yellow-400":"" } hover:scale-90 
               `}
            >
              <FaArrowLeft
                className={`${lastSlide > 0 ? "visible" :"invisible"} text-[40px]  cursor-pointer `}
                onClick={handlePerv}
              />
            </div>
            <div
              className={`border border-black rounded-full p-3 shadow-inner shadow-[#000000b9] hover:scale-90 bg-yellow-400
              `}
            >
              <FaArrowRight
                className="text-[40px] cursor-pointer "
                onClick={handleNext}
              />
            </div>
          </div>
      
      </div>
    </div>
  );
}
