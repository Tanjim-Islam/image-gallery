import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ selectedImg, setSelectedImg, goToPrev, goToNext }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  // Animation variants for sliding images
  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    }),
  };

  return (
    <div className="backdrop" onClick={handleClick}>
      <AnimatePresence initial={false}>
        <motion.div
          key={selectedImg}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="image-container"
        >
          <div className="controls prev" onClick={goToPrev}>
            {/* SVG for previous */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path
                fill="currentColor"
                d="M31.9 145L184 9.8c18.8-18.8 49.2-18.8 68 0l8.5 8.5c18.8 18.8 18.8 49.2 0 68L117.3 192l143.2 105.7c18.8 18.8 18.8 49.2 0 68l-8.5 8.5c-18.8 18.8-49.2 18.8-68 0L31.9 167c-18.8-18.8-18.8-49.2 0-68l.1-.2z"
              />
            </svg>
          </div>
          <motion.img src={selectedImg} alt="enlarged pic" />
          <div className="controls next" onClick={goToNext}>
            {/* SVG for next */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path
                fill="currentColor"
                d="M224.1 367L72 502.2c-18.8 18.8-49.2 18.8-68 0l-8.5-8.5c-18.8-18.8-18.8-49.2 0-68L138.7 320 8.5 214.3c-18.8-18.8-18.8-49.2 0-68l8.5-8.5c18.8-18.8 49.2-18.8 68 0L224.1 345c18.8 18.8 18.8 49.2 0 68v.1z"
              />
            </svg>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal;
