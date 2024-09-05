import React from 'react';
import image from '../../../public/assests/joinfoodiv.jpg'; // Update with the correct path to your image

const JoinFoodiv = () => {

    return (
        <>
            <div className="mt-24 flex flex-col lg:flex-row items-center lg:p-10 gap-16 lg:px-28 px-10">
                <div className="flex flex-col w-full lg:w-1/2 items-center  justify-start space-y-4">
                  <div>

                    <p className='lg:text-5xl text-4xl  font-semibold '>Join Foodiv Partner Program & Earn regular income</p>
                    <p className="text-lg text-gray-600  font-sans text-start">
                        Let’s have a win-win partnership by working together to help restaurants or food businesses. Join Foodiv’s Partner Program and earn upto 20% as recurring revenue.
                    </p>
                    <button className="py-2 px-5  mt-5 text-base border-2 border-orange-600 bg-orange-600 hover:bg-white hover:text-orange-600 text-white rounded-3xl">
                        Get Started
                    </button>
                  </div>
                </div>
                <div className="flex w-full lg:w-1/2 justify-start">
                    <div className="w-full  shadow-lg">
                        <img
                            src={image}
                            alt="Restaurant Online"
                            className="w-full h-auto object-contain "
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default JoinFoodiv;
