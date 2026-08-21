"use client";

import { motion } from "framer-motion";

export default function Macbook({ src }: { src: string }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl [perspective:1200px]">
      <motion.div
        initial={{ rotateX: -25, y: 80 }}
        whileInView={{ rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="relative mx-auto w-[90%] rounded-t-[28px] border border-neutral-700 bg-neutral-900 p-3 shadow-2xl [transform-style:preserve-3d]"
      >
        <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-neutral-700" />

        <div className="overflow-hidden rounded-[18px] bg-black">
          <img src={src} alt="screen" className="block h-auto w-full object-cover" />
        </div>
      </motion.div>

      <motion.div
        initial={{ rotateX: -25 }}
        whileInView={{ rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1,
          delay: 0.1,
        }}
        className="relative mx-auto h-5 w-[96%] rounded-b-[40px] bg-gradient-to-b from-neutral-300 to-neutral-500 shadow-xl"
      >
        <div className="absolute left-1/2 top-1/2 h-2 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400" />
      </motion.div>

      <div className="mx-auto mt-3 h-8 w-[80%] rounded-full bg-black/40 blur-xl" />
    </div>
  );
}
