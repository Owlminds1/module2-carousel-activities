import Image from 'next/image';
import React from 'react'
import { IoMdHome, IoMdRefresh } from 'react-icons/io';
// import { FaArrowRight } from 'react-icons/fa';

type SlideProps = {
  setIsFirstScreen: (value: string) => void;
};
const EmotinsImage = ({setIsFirstScreen}:SlideProps) => {
   return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-[500px] ">
          <div>
            <div className="p-5 relative text-black flex justify-center items-center  shadow-md shadow-black overflow-hidden rounded-lg">
             <Image src="/C13-L1-A2/Plutchik_Dyads.png" width={400} height={200} alt="image"/>
            </div>
          </div>
   <div className=" py-4 flex items-center justify-around  text-black">
            <div
              className={`border border-black rounded-full p-3 shadow-inner shadow-[#000000b9] hover:scale-90 bg-yellow-400`}
            >
              <IoMdHome 
                className="text-[40px]  cursor-pointer "
                onClick={() => setIsFirstScreen("strartSlid")}
              />
            </div> 
            
            
            <div
              className={`border border-black rounded-full p-3 shadow-inner shadow-[#000000b9] hover:scale-90 bg-yellow-400`}
            >
              <IoMdRefresh
                className="text-[40px]  cursor-pointer "
                onClick={() => setIsFirstScreen("slide")}
              />
            </div>
          </div>
         
        </div>
      </div>
    );
}

export default EmotinsImage
