"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SlideData from "@/layout-C10-L3-A2/slide.json";
import SlideData2 from "@/layout-C10-L3-A2/slide2.json";
import answerData from "@/layout-C10-L3-A2/answerdata.json"
import answerData2 from "@/layout-C10-L3-A2/answerdata2.json"
import Image from "next/image";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isCorrect, SetIsCorrect] = useState<boolean | null>(null);
  const [activeIndex,setActivIndex]=useState<number | null>(null)
  const [shuffle,setShuffle] = useState(SlideData)
  const [shuffle2,setShuffle2] = useState(SlideData2)
  const [playCorrect,setPlayCorrect] =useState<HTMLAudioElement>()
  const [showBtn,setShowBtn] =useState(true)
  const [showSuggetion,setShowSuggetion] =useState(false)


  useEffect(()=>{
const shuffled = [...SlideData].sort(()=> Math.random() - 0.5)
setShuffle(shuffled)
const shuffled2 = [...SlideData2].sort(()=> Math.random() - 0.5)
setShuffle2(shuffled2)

setPlayCorrect( new Audio("/sound/correct.mp3"))

  },[])

  const handlePrev = () => {
   
    swiperRef?.current?.slidePrev();
  };

  const handleNext = () => {
     
    swiperRef?.current?.slideNext();
  };
  const handleSlideChange = (swiper: SwiperClass) => {
    if(swiper.activeIndex === 0){

      setShowBtn(true)
    }
    else{
      setShowBtn(false)

    }
    SetIsCorrect(null);
    setActivIndex(null)
    setActiveSlide(swiper.activeIndex);
    window.scrollTo(0, 0);
    setShowSuggetion(false)

  };

  const hanldeCheck = (item: string, answer: string,bIndex:number) => {
    setActivIndex(bIndex)
    if (item === answer) {
      SetIsCorrect(true);
      playCorrect?.play()
      setShowBtn(true)
    } else {
      SetIsCorrect(false);
    }
  };


  useEffect(()=>{
    swiperRef.current?.updateAutoHeight()
  },[showSuggetion])
  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center gap-5 flex-col p-5 ">
      <div>
        <h1 className="text-3xl text-black font-bold text-center">
          Big or Little
        </h1>

        <p className="text-xl text-black font-medium py-2 text-center">
          {activeSlide >= 1 && SlideData.length > activeSlide  ? "Identify each situation as a big deal or a little deal." : activeSlide >  7 ? "Now you get to identify each situation as a big or a little deal but you also justify your reasons.":"" }
        </p>
      </div>
      <div className="w-[80%] ">
        <div className=" w-full shadow-lg p-2 rounded-lg ">
          <Swiper
            loop={false}
            autoHeight={true}
            allowTouchMove={false}
            autoplay={false}
            modules={[Navigation]}
            slidesPerView={1}
            // navigation
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
              <div className="flex flex-col gap-4 justify-center items-center min-h-[300px]">
                <Image
                  src="/C10Images/slide1.jpg"
                  width={300}
                  height={100}
                  alt="C10Images"
                />
                <p className="text-lg text-black font-medium">
                  Little deal situations can be a little irritating, but usually
                  are solvable by ourselves.
                </p>

                <p className="text-lg text-black font-medium">
                  Big deal situations can be more than irritating, but are
                  usually solvable with adult intervention.
                </p>
              </div>
            </SwiperSlide>
            {shuffle.map((i, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-12 gap-8 w-full p-3 h-full min-h-[300px] bg-white rounded-lg">
                  <div className="col-span-12 flex justify-center items-center ">
                    <Image src="/C10Images/Why.jpg" width={300} height={100} alt="C10Images" />
                  </div>
                  
                  <div className="col-span-12   flex justify-center items-center">
                    <h4 key={index} className="text-2xl w-[80%] text-black text-center">
                      {i.Question}
                    </h4>
                  </div>
                  <div className="col-span-12  w-full flex flex-wrap justify-center items-center gap-1  ">
                    {answerData.map((item, bIndex) => (
                      <button
                        key={bIndex}
                        onClick={() => hanldeCheck(item, i.val,bIndex)}
                        className={`${bIndex === activeIndex ? isCorrect ? "bg-green-600" : "bg-red-600":"bg-violet-800"}  min-w-[260px] p-2 rounded-lg cursor-pointer text-white active:scale-95 transition-all duration-200 active:shadow-lg`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {shuffle2.map((i, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-12 gap-8 w-full p-3 h-full min-h-[300px] bg-white rounded-lg">
                  <div className="col-span-12 flex justify-center items-center ">
                    <Image src="/C10Images/Questions.jpg" width={300} height={100} alt="C10Images" />
                  </div>
                  
                  <div className="col-span-12   flex justify-center items-center">
                    <h4 key={index} className="text-2xl w-[80%] text-black text-center">
                      {i.Question}
                    </h4>
                  </div>
                  <div className="col-span-12  w-full flex flex-wrap justify-center items-center gap-1  ">
                    {answerData2.map((item, bIndex) => (
                      <button
                        key={bIndex}
                        onClick={() => hanldeCheck(item, i.val,bIndex)}
                        className={`${bIndex === activeIndex ? isCorrect ? "bg-green-600" : "bg-red-600":"bg-violet-800"}  min-w-[260px] p-2 rounded-lg cursor-pointer text-white active:scale-95 transition-all duration-200 active:shadow-lg`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
<div className="col-span-12 w-full flex justify-center items-center flex-col gap-4"> 
                    <textarea className="min-h-[100px] p-2 border border-gray-300 rounded-lg w-[55%] text-center text-black" placeholder="write here..." />
{
  !showSuggetion ? <button onClick={()=>setShowSuggetion(true)  }  className="text-white bg-violet-900 px-6 py-1 rounded-lg cursor-pointer font-medium" > Show Suggetion</button>
:
<p className="text-black text-center w-[80%] text-lg">{i.suggetions}</p>
}


</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* slide buttons  */}
        <div className="flex justify-between items-center gap-5 w-full mt-8  ">
          <span
            onClick={handlePrev}
            className={`${
              activeSlide > 0 ? "visible" : "invisible"
            }  cursor-pointer text-4xl border border-black rounded-full p-3  bg-yellow-400`}
          >
            <FaArrowLeft className="text-black" />
          </span>
          <span
            onClick={handleNext}
            className={` ${
activeSlide < SlideData.length + SlideData2.length  && showBtn ? "visible" : "invisible"
            }  cursor-pointer text-4xl border border-black rounded-full p-3  bg-yellow-400`}
          >
            <FaArrowRight className="text-black" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
