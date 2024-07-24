import React from "react";
import Title from "./Title";
import IconThankYou from "../../assets/images/icon-thank-you.svg";

const Finish = () => {
  return (
    <div className="flex gap-4 md:gap-0 flex-col md:h-full h-max justify-center items-center text-center px-6 py-16 md:p-0 md:bg-transparent md:rounded-none md:shadow-none w-full max-w-100 bg-white rounded-xl shadow-md -mt-18 z-10 md:mt-0 m-4 md:m-0">
      <IconThankYou />
      <Title
        title={"Thank You!"}
        subtitle={
          "Thanks for confirming you subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com"
        }
      />
    </div>
  );
};

export default Finish;
