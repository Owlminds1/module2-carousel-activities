"use client";
import BRAVOModle from "@/components/brovomodle";
import KeepTryingModel from "@/components/KeepTryingModel";
import { useEffect, useState } from "react";

const Emotins = [
  { name: "Trust" },
  { name: "Fear" },
  { name: "Surprise" },
  { name: "Sadness" },
  { name: "Disgust" },
  { name: "Anger" },
  { name: "Joy" },
  { name: "Anticipation" },
];

interface myProps {
  item: string;
}
const EmotionBar = ({ item }: myProps) => {
  const [open, setOpen] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [wrongAudio, setWrongAudio] = useState<HTMLAudioElement | null>(null);
  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    setWrongAudio(new Audio("/sound/wrong_buzzer.mp3"));
    setCorrectAudio(new Audio("/sound/correct.mp3"));
  }, []);

  const handleCheck = (val: string) => {
    if (item === val) {
      setOpen(true);
      setRightAnswer(true);
      correctAudio?.play();
      setSelected(val);
    } else {
      setOpen(true);
      setRightAnswer(false);
      wrongAudio?.play();
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-full p-2">
      {Emotins.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer ${
            selected === item.name ? "bg-green-400" : "bg-yellow-400"
          } w-[200px] px-5 py-2 text-black rounded-lg shadow-inner shadow-[#000000a3] font-bold tex-lg text-center hover:scale-95`}
          onClick={() => handleCheck(item.name)}
        >
          {item.name}
        </div>
      ))}
      {rightAnswer ? (
        <BRAVOModle open={open} setOpen={setOpen} src="/Well_Done.jpg" />
      ) : (
        <KeepTryingModel open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default EmotionBar;
