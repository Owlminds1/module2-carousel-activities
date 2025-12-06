"use client";
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";


type myProps ={
open:boolean;
setOpen:( value :boolean)=>void;
src:string
}

const BRAVOModle = ({open,setOpen,src}:myProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle className="text-center text-3xl ">BRAVO!</DialogTitle>
        <DialogDescription className="flex  justify-center items-center">
          <Image
            src={src}
            width={300}
            height={200}
            alt="modle image"
            className="rounded-lg"
            unoptimized
          />
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default BRAVOModle
