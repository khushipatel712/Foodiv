import React, { useRef, useEffect } from 'react'; // Import useEffect
import gsap from 'gsap';
import image from 'D:/Node and React/Foodiv/Client/public/assests/FOS_seamless.png'; // Update with the correct path to your image

const Seamless = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: -10,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <>
      <div className="text-center flex justify-center flex-col items-center mt-20 lg:mx-20 mx-5">
        <div >
          <h2 className="lg:text-4xl text-3xl font-sans font-medium px-20">
            Food Ordering System for
            Seamless Operations Online and On-Premises
          </h2>
        </div>
        <div className='w-[98px] h-1 text-orange-500 bg-orange-500 text-center mt-4'></div>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:p-10 gap-28 lg:px-20 px-10">
        <div className="flex w-full lg:w-1/2 justify-start">
          <div ref={imageRef} className="w-full relative bg-[#FDBA92] border-8 border-white rounded-lg shadow-lg">
            <img
              src={image}
              alt="Restaurant Online"
              className="w-full h-auto object-contain rounded-lg p-3"
            />
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 items-center justify-center ">
          <p className="text-lg text-gray-600 text-center font-sans">
            With capabilities to take your restaurant online within five minutes, the <span className='text-orange-500'>food ordering system</span> enables a digital-first order-from-anywhere environment for your eateries. Whereas its excellent UI/UX and the engaging content along with a suite of marketing tools attract more visitors, increase conversions by converting the visitors into prospective customers, and woo them for coming back for more.
          </p>
          <button className="py-2 px-5 mt-5 text-base border-2 border-orange-600 bg-orange-600 hover:bg-white hover:text-orange-600 text-white rounded-3xl">
            Register Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Seamless;
