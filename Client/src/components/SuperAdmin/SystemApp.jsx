import React, { useState, useRef, useEffect } from 'react'
import blog from '../../../public/assests/pizzao.jpg'
import blog2 from '../../../public/assests/pizzao1.png'
import gsap from 'gsap';
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";

const contentData = [
  {
    title: "Readymade Online Pizza Ordering Software",
    image1: blog,
    content1:
      " Grab our On-demand Pizza Ordering system and turn more pizza lovers into loyal customers. From managing orders to menu and deliveries- you will get a complete suite of features to start your online Pizza delivery business within an hour!",
  },
  {

    title2: "Essential Features of Online Pizza Ordering System",
    content2:
      "Deliver infinite orders with end-to-end features for your single pizzeria or a chain of pizza restaurants, all in your online pizza ordering software.",
    panel: [{
      title: "Pizza Store App",
      desc: "The Impressive Store App to run and manage your pizza delivery business seamlessly with the right technology and features.",
      image2: blog2,
      keypoints: [{
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },
      {
        keytitle: "Interactive dashboard",
        keydetail: "Create a digital menu for your Pizza store by adding your pizza offerings, images, and prices. Customise and update the menu anytime!"
      },
      {
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },
      {
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },
      {
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },

      ],
    }
    ],
  },


  {
    title3: "Essential Features of Online Pizza Ordering System",

    panel: [{
      title: "Pizza Store App",
      desc: "The Impressive Store App to run and manage your pizza delivery business seamlessly with the right technology and features.",
      image3: blog2,
      keypoints: [{
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },
      {
        keytitle: "Interactive dashboard",
        keydetail: "Create a digital menu for your Pizza store by adding your pizza offerings, images, and prices. Customise and update the menu anytime!"
      },
      {
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },
      {
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },
      {
        keytitle: "login",
        keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
      },

      ],
    }
    ],
  },

  {

    title4: "Why Does Your Pizza Store Need an Online Pizza Delivery Software?",
    panel: [{
      image4: blog2,
      keypoints: [{
        keytitle: "Unlimited Orders",
        keydetail: "Manage unlimited orders for your single or chain pizza stores via next-gen technology and features of the online pizza ordering application."
      },
      {
        keytitle: "Unlimited Orders",
        keydetail: "Manage unlimited orders for your single or chain pizza stores via next-gen technology and features of the online pizza ordering application."
      },
      {
        keytitle: "Unlimited Orders",
        keydetail: "Manage unlimited orders for your single or chain pizza stores via next-gen technology and features of the online pizza ordering application."
      },
      {
        keytitle: "Unlimited Orders",
        keydetail: "Manage unlimited orders for your single or chain pizza stores via next-gen technology and features of the online pizza ordering application."
      },
      {
        keytitle: "Unlimited Orders",
        keydetail: "Manage unlimited orders for your single or chain pizza stores via next-gen technology and features of the online pizza ordering application."
      },

      ],
    }
    ],
  },

  //  {
  //   title3: "Essential Features of Online Pizza Ordering System",

  //   panel: [{
  //     title: "Pizza Store App",
  //     desc: "The Impressive Store App to run and manage your pizza delivery business seamlessly with the right technology and features.",
  //     image3: blog2,
  //     keypoints: [{
  //       keytitle: "login",
  //       keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
  //     },
  //     {
  //       keytitle: "Interactive dashboard",
  //       keydetail: "Create a digital menu for your Pizza store by adding your pizza offerings, images, and prices. Customise and update the menu anytime!"
  //     },
  //     {
  //       keytitle: "login",
  //       keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
  //     },
  //     {
  //       keytitle: "login",
  //       keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
  //     },
  //     {
  //       keytitle: "login",
  //       keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
  //     },

  //     ],
  //   }
  //   ],
  // },

  // {

  //   title4: "Delivery Options",
  //   content4: "With the online ordering system for takeaway, restaurant owners can offer three different types of takeaway deliveries:",
  //   image4: blog,
  //   points: [{
  //     pointtitle: "hello",
  //     pointdetail: "helllo"
  //   }],
  // },
  {
    faqs: {
      title: "FAQs For Online Takeaway Ordering System",
      description:"We have tried to answer the maximum questions we get from our customers. Make a confident decision with complete clarity!",
      questions: [
        {
          "question": "What is a restaurant takeaway system?",
          "answer": "A restaurant takeaway system is an online ordering process that enables customers to pick up their food parcels on their own. Customers receive the notification for pickup once the order is ready."
        },
        {
          "question": "What is a restaurant takeaway system?",
          "answer": "A restaurant takeaway system is an online ordering process that enables customers to pick up their food parcels on their own. Customers receive the notification for pickup once the order is ready."
        },
        {
          "question": "What is a restaurant takeaway system?",
          "answer": "A restaurant takeaway system is an online ordering process that enables customers to pick up their food parcels on their own. Customers receive the notification for pickup once the order is ready."
        },
        {
          "question": "What is a restaurant takeaway system?",
          "answer": "A restaurant takeaway system is an online ordering process that enables customers to pick up their food parcels on their own. Customers receive the notification for pickup once the order is ready."
        },
      ]
    },
  }
]

export default function SystemApp() {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = index => {
      setOpenIndex(openIndex === index ? null : index);
    };
  

  const imageRef = useRef(null);
  const buttonRef = useRef(null);


  useEffect(() => {
    gsap.to(imageRef.current, {
      y: -10,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });
    gsap.to(buttonRef.current, {
      y: -40,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });

  }, []);

  return (
    <div>
      <div className="container mx-auto p-4 mt-24 px-20">
        {contentData.map((section, index) => (
          <div key={index} className="section mb-8">
            {section.title && (
              <div className="mb-4 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:pr-4 items-center">
                  <p className="text-xl md:text-5xl font-medium mb-6">{section.title}</p>
                  <p className="text-base text-left text-gray-600 md:text-lg">{section.content1}</p>
                  <button className="py-2 px-5  mt-5 text-base border-2 border-orange-600 hover:bg-orange-600 bg-white text-orange-600 hover:text-white rounded-3xl">
                    Register For Free
                  </button>
                </div>
                {section.image1 && (
                  <div ref={imageRef} className="flex-none mt-4 md:mt-0 md:ml-4 w-full md:w-1/2 lg:w-1/2">
                    <img src={section.image1} alt={section.title} className="w-full h-auto" />
                  </div>
                )}
              </div>
            )}



            {section.title2 && (
              <div className="mb-4 ">
                <p className="text-4xl font-bold mb-2 text-center">{section.title2}</p>
                <p className="text-lg mb-4 text-gray-600 text-center">{section.content2}</p>

                {section.panel && section.panel.map((panel, idx) => (
                  <div key={idx} className="mt-8 flex flex-col lg:flex-row items-start ">
                    <div className="flex-1 ">
                      <h3 className="text-3xl font-bold mb-2">{panel.title}</h3>
                      <p className="mb-8 text-gray-600">{panel.desc}</p>

                      {panel.keypoints && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {panel.keypoints.map((keypoint, kIdx) => (
                            <div key={kIdx} className=" mb-2">
                              <div className='flex'>


                                <div>
                                  <FaRegCircleCheck className='mr-2 pt-[6px] size-6 text-orange-500' />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg">{keypoint.keytitle}</h4>
                                  <p className='text-gray-600 '>{keypoint.keydetail}</p>
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {panel.image2 && (
                      <div className="flex items-center justify-center mt-4  lg:pl-10 lg:mt-0 p-5 w-full lg:w-1/2">
                        <img src={panel.image2} alt={panel.title} className="" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}


            {section.title3 && (
              <div className="mb-4 ">
                {section.panel && section.panel.map((panel, idx) => (
                  <div key={idx} className="mt-8 flex flex-col lg:flex-row items-start ">

                    {panel.image3 && (
                      <div className="flex items-center justify-center mt-4  lg:pl-10 lg:mt-0 p-5 w-full lg:w-1/2">
                        <img src={panel.image3} alt={panel.title} className="" />
                      </div>
                    )}
                    <div className="flex-1 ">
                      <h3 className="text-3xl font-bold mb-2">{panel.title}</h3>
                      <p className="mb-8 text-gray-600">{panel.desc}</p>

                      {panel.keypoints && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {panel.keypoints.map((keypoint, kIdx) => (
                            <div key={kIdx} className=" mb-2">
                              <div className='flex'>


                                <div>
                                  <FaRegCircleCheck className='mr-2 pt-[6px] size-6 text-orange-500' />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg">{keypoint.keytitle}</h4>
                                  <p className='text-gray-600 '>{keypoint.keydetail}</p>
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

      </div>


      <div className="bg-gray-100 h-full w-full flex flex-col lg:flex-row justify-between items-center lg:gap-28 px-10 lg:px-28 py-10 mb-10">
        <div className="lg:w-[70%] w-full lg:pr-10">
          <p className="text-3xl font-medium mb-4">Say Yes To Delivering More Pizzas Today!</p>
          <p className="text-lg text-gray-600 ">
            Take your restaurant's online ordering to the next level with our top-of-the-line pizza ordering system. Contact us now to get started.
          </p>
        </div>

        <div className="lg:w-[30%] w-full flex justify-end mt-5 lg:mt-0">
          <button ref={buttonRef} className="py-[10px] px-[40px] text-lg border-2 border-orange-600 bg-orange-600 hover:bg-white hover:text-orange-600 text-white rounded-full transition duration-300 ease-in-out">
            Try Now
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-24 lg:px-28">

        {contentData.map((section, index) => (
          <div key={index} className="section mb-8">

            {section.title4 && (
              <div className="mb-4 text-center">
                <p className="text-4xl font-bold mb-8">{section.title4}</p>

                {section.panel && section.panel.map((panel, idx) => (
                  <div key={idx} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

                    {/* Left Side Keypoints */}
                    <div className="flex flex-col space-y-4 text-left">
                      {panel.keypoints && panel.keypoints.slice(0, 3).map((keypoint, kIdx) => (
                        <div key={kIdx} className="flex items-start justify-start">
                          <div>
                            <h4 className="font-semibold text-xl">{keypoint.keytitle}</h4>
                            <p className="text-gray-500 text-lg">{keypoint.keydetail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Center Image */}
                    {panel.image4 && (
                      <div className="flex justify-center">
                        <img src={panel.image4} alt={panel.title} className="w-full h-auto lg:w-2/3" />
                      </div>
                    )}

                    {/* Right Side Keypoints */}
                    <div className="flex flex-col space-y-4 text-left">
                      {panel.keypoints && panel.keypoints.slice(3).map((keypoint, kIdx) => (
                        <div key={kIdx} className="flex items-start justify-start">
                          <div>
                            <h4 className="font-semibold text-xl">{keypoint.keytitle}</h4>
                            <p className="text-gray-500 text-lg">{keypoint.keydetail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            )}


          </div>




        ))}

      </div>

      <div className="bg-gray-100 w-full flex flex-col justify-center items-center px-8 lg:px-20 py-10 mb-10">
  
  <div className="w-full text-center mb-6 lg:px-28">
    <p className="text-3xl font-semibold mb-3 text-gray-800">
    Ready To Try Our Commission-free Online Pizza Ordering System?
    </p>
    <p className="text-xl leading-tight text-gray-600">
    Upgrade your restaurant's online ordering system with our state-of-the-art platform. Contact us now for any queries.
    </p>
  </div>

  <div className="w-full flex justify-center">
    <button className="py-[10px] px-[40px] text-lg font-medium border-2 border-orange-600 bg-orange-600 hover:bg-white hover:text-orange-600 text-white rounded-full transition duration-300 ease-in-out">
      Try Now
    </button>
  </div>
  
</div>


<div className="container  mx-auto mt-20 mb-20 px-20 ">
  <div className="flex flex-col lg:flex-row items-start justify-between  lg:px-20 lg:py-20 p-4  bg-pink-50 rounded-3xl border-2 border-gray-200">
    {/* Left Side - Title and Description */}
    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
      {contentData.map((section, index) => (
        <div key={index} className="section">
          {section.faqs && (
            <>
              <h1 className="text-4xl font-semibold mb-4">{section.faqs.title}</h1>
              <p className="text-gray-600 mb-6 text-lg">{section.faqs.description}</p>
            </>
          )}
        </div>
      ))}
    </div>

    {/* Right Side - FAQ */}
    <div className="w-full lg:w-1/2 ">
      {contentData.map((section, index) => (
        <div key={index} className="section">
          {section.faqs && (
            <div>
            {section.faqs.questions.map((item, qIndex) => (
    <div key={qIndex} className="border-b border-gray-200">
      <button
        onClick={() => toggleAnswer(qIndex)}
        className="w-full font-medium flex justify-between items-center text-left py-3 px-4 mb-1  text-black text-xl"
      >
        {/* Question Text */}
        <span>{item.question}</span>

        {/* Conditionally render Add or Close icon */}
        {openIndex === qIndex ? (
          <IoClose className="text-xl " />
        ) : (
          <IoIosAdd className="text-2xl " />
        )}
      </button>

      {/* Display the answer if the question is open */}
      {openIndex === qIndex && (
        <div className="p-4 text-gray-600">
          {item.answer}
        </div>
      )}
    </div>
  ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>


      {/* {section.faqs && (
              <div className="faq">
                <h2 className="text-2xl font-bold mb-4">{section.faqs.title}</h2>
                {section.faqs.questions && section.faqs.questions.map((faq, fIdx) => (
                  <div key={fIdx} className="mb-4">
                    <p className="font-semibold">{faq.question}</p>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            )} */}
    </div>
  )
}


