"use client";
import React, { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

import whatSayData from "@/layout-C10-L3-A4B/sayData.json";
import whatfeelData from "@/layout-C10-L3-A4B/feelData.json";
import answerKeyJson from "@/layout-C10-L3-A4B/answerKey.json";

// TYPES
type ItemType = { text: string };
type AnswerType = { say: string; feel1: string; feel2: string };
type UserAnswerType = { [slideId: number]: AnswerType };
type AnswerKeyType = {
  id: number;
  Question: string;
  imag: string;
  correct: AnswerType;
};

// shuffle helper
const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);


const answerKey: AnswerKeyType[] = answerKeyJson;

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [sayList, setSayList] = useState<ItemType[]>(() => shuffleArray(whatSayData));
  const [feelList, setFeelList] = useState<ItemType[]>(() => shuffleArray(whatfeelData));

  const [userAnswer, setUserAnswer] = useState<UserAnswerType>({});

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
    window.scrollTo(0, 0);
  };

  const handleDrop = (e: React.DragEvent, target: keyof AnswerType) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    const correct = answerKey.find((q) => q.id === activeSlide);
    if (!correct) return;

    setUserAnswer((prev) => {
  const prevAnswers = prev[activeSlide] || { say: "", feel1: "", feel2: "" };
  const newAnswers = { ...prevAnswers }; // use const

  if (target === "say" && text === correct.correct.say) {
    newAnswers.say = text;
    setSayList((prev) => prev.filter((item) => item.text !== text));
  }
  if (target === "feel1" && text === correct.correct.feel1) {
    newAnswers.feel1 = text;
    setFeelList((prev) => prev.filter((item) => item.text !== text));
  }
  if (target === "feel2" && text === correct.correct.feel2) {
    newAnswers.feel2 = text;
    setFeelList((prev) => prev.filter((item) => item.text !== text));
  }

  return { ...prev, [activeSlide]: newAnswers };
});

  };

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center gap-5 flex-col p-5">
      <div>
        <h1 className="text-3xl text-black font-bold text-center">GROWTH LADDER</h1>
        <p className="text-xl text-black font-medium py-2 text-center">
          {activeSlide === 0 ? "Let’s practice this with some situations." : ""}
        </p>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-12 place-items-start gap-1 w-full shadow-lg p-2 rounded-lg">
          {/* SAY List */}
          <div
            className={`${
              sayList.length === 0 ? "invisible" : "visible"
            } ${activeSlide === 0 ? "hidden" : "flex"}  col-span-3 w-full flex-col gap-5 p-2 bg-orange-300 rounded-lg shadow-lg`}
          >
            <h2 className="text-2xl font-bold border-b-2 border-black text-center text-black">What I’ll say</h2>
            <div className="flex justify-center items-center gap-1 flex-wrap w-full">
              {sayList.map((item, index) => (
                <p
                  key={item.text + index}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("type", "say");
                    e.dataTransfer.setData("text", item.text);
                  }}
                  className="text-black rounded-lg text-center shadow-md bg-white p-2 text-lg font-medium cursor-grab"
                >
                  {item.text}
                </p>
              ))}
            </div>
          </div>

          {/* Swiper */}
          <div className={`${activeSlide === 0 ? "col-span-12" : "col-span-6"} w-full border rounded-lg`}>
            <Swiper
              loop={false}
              autoHeight
              allowTouchMove={false}
              modules={[Navigation]}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
            >
              <SwiperSlide>
                <div className="flex justify-center items-center min-h-[200px] w-full gap-5 p-5">
                  <ul className="list-disc list-inside space-y-5">
                    <li className="text-black text-lg font-medium">Read and understand the situation.</li>
                    <li className="text-black text-lg font-medium">
                      Refer to the growth ladder and identify what you can say to cope better.
                    </li>
                    <li className="text-black text-lg font-medium">
                      Select two sets of feelings from the table to complete the sentence.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>

              {answerKey.map((item, index) => (
                <SwiperSlide key={`slide-${item.id}-${index}`}>
                  <div className="min-h-[300px] flex justify-start items-center gap-5 flex-col p-3">
                    <h4 className="text-lg text-black font-medium text-center">{item.Question}</h4>
                   <div className="relative w-[300px] h-[300px]">
                     <Image src={item.imag} fill objectFit="contain" alt="C10_L3_A4B Image" />
                   </div>
                    <h4 className="text-lg text-black font-medium text-center">
                      How can you cope with this situation? What statements can you say to make yourself feel better?
                    </h4>

                    <p className="text-black text-lg font-medium text-center leading-loose">
                      I can say{" "}
                      <span
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, "say")}
                        className="mx-2 px-4 py-1 border-b-2 border-dashed border-black"
                      >
                        {userAnswer[item.id]?.say || "________"}
                      </span>{" "}
                      because it will make me feel more{" "}
                      <span
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, "feel1")}
                        className="mx-2 px-4 py-1 border-b-2 border-dashed border-black"
                      >
                        {userAnswer[item.id]?.feel1 || "________"}
                      </span>{" "}
                      and{" "}
                      <span
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, "feel2")}
                        className="mx-2 px-4 py-1 border-b-2 border-dashed border-black"
                      >
                        {userAnswer[item.id]?.feel2 || "________"}
                      </span>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* FEEL List */}
          <div
            className={`${
              feelList.length === 0 ? "invisible" : "visible"
            } ${activeSlide === 0 ? "hidden" : "flex"} col-span-3 w-full flex-col gap-5 p-2 bg-orange-300 rounded-lg shadow-lg`}
          >
            <h2 className="text-2xl font-bold border-b-2 border-black text-center text-black">What I’ll feel</h2>
            <div className="flex justify-center items-center gap-1 flex-wrap w-full">
              {feelList.map((item, index) => (
                <p
                  key={item.text + index}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("type", "feel");
                    e.dataTransfer.setData("text", item.text);
                  }}
                  className="text-black rounded-lg shadow-md bg-white p-2 text-lg font-medium cursor-grab"
                >
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-5 w-full mt-8">
          <span
            onClick={handlePrev}
            className={`${activeSlide > 0 ? "visible" : "invisible"} cursor-pointer text-4xl border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowLeft className="text-black" />
          </span>
          <span
            onClick={handleNext}
            className={`${activeSlide < answerKey.length ? "visible" : "invisible"} cursor-pointer text-4xl border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowRight className="text-black" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
