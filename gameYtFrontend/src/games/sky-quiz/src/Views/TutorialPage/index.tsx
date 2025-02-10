import React from "react";
import HeadingText from "../../Components/Base/Heading";
import ImageComponent from "../../Components/Custom/ImageComponent";
import UpIconImage from "../../Resources/Images/upicon.png";
import DownIconImage from "../../Resources/Images/downIcon.png";
import BlueBirdImage from "../../Resources/Images/blueBird.png";
import GoIconImage from "../../Resources/Images/goIcon.png";
import TapToContinueIconImage from "../../Resources/Images/taptcontinue.png";
import EnterIconImage from "../../Resources/Images/enterIcon.png";
import { easeIn, motion } from "framer-motion";

interface TutorialViewProps {
  continueHandler: React.MouseEventHandler;
}

const TutorialPageView: React.FC<TutorialViewProps> = ({ continueHandler }) => {
  return (
    <div className="tutorial-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: easeIn }}
        className="tutorial-heading-container"
      >
        <HeadingText text="Tutorial" className="text-center" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: easeIn }}
        className="tutorial-content"
      >
        <div className="tutorial-content-direction">
          <ImageComponent src={UpIconImage} className="w-20 h-20" />
          <div className="tutorial-up-content">
            <HeadingText
              text="Press"
              className="text-white text-center text-2xl font-normal"
            />
            <ImageComponent src={BlueBirdImage} className="w-16 h-12" />
            <HeadingText
              text="To fly"
              className="text-white text-center text-2xl font-normal"
            />
          </div>
          <ImageComponent src={DownIconImage} className="w-20 h-20" />
        </div>
        <div className="down-content-info">
          <div className="down-content-direction">
            <ImageComponent src={GoIconImage} className="h-20 w-20" />
            <HeadingText
              text="/"
              className="text-white font-normal text-8xl "
            />
            <ImageComponent src={EnterIconImage} className="w-20 h-20" />
          </div>
          <HeadingText
            text="To choose the correct answer"
            className="font-normal text-2xl mt-2 text-white w-full text-center"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ y: "-10vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <ImageComponent
          src={TapToContinueIconImage}
          className="tutorial-tap"
          onClick={continueHandler}
        />
      </motion.div>
    </div>
  );
};

export default TutorialPageView;
