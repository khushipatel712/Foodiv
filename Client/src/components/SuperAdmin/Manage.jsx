import React from 'react';

const Manage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:px-28 px-5 mt-20 gap-10">
      <div className="flex w-full lg:w-1/2 justify-start">
        <div className="relative w-full pt-[56.25%]"> {/* Maintain aspect ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/LprVJJJu15o" // Replace with your YouTube video ID
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
        <p className="lg:text-4xl text-3xl text-black text-center font-medium font-sans">
          Manage Your Restaurant Like a Pro with Foodiv's Online Restaurant Ordering System
        </p>
        <p className="mt-6 text-lg text-gray-600 text-center">
          With ready to implement, the online food ordering system brings everything to one place, from efficient web & mobile app ordering and delivery to POS and inventory; the solution empowers easy management at your fingertips.
        </p>
      </div>
    </div>
  );
};

export default Manage;
