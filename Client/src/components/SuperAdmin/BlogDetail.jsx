import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blog1 from '../../../public/assests/blog1.jpg'
import { IoIosMail } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FaPinterestP } from "react-icons/fa";
// import { BsYoutube } from 'react-icons/bs';
import elevate from '../../../public/assests/elevate.jpg'
import { FaCalendarDays } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const newsData = [
    {
        _id: "1",
        title: "UberEats Restaurant Registration: A Comprehensive Guide",
        summary: "Explore the UberEats registration process to make your restaurant discoverable to millions and boost profitability in the rapidly growing online food delivery market.",
        imageUrl: blog1,
        category: "Food Delivery",
        restaurantName: "Urban Eats",
        admin: "Foodiv",
        date: "June 26, 2024",
        content: [
            {
                heading: "Online Food Delivery Market Overview",
                text: "The online food delivery market is booming, with revenue expected to reach $1.22 trillion in 2024 and over 2.8 billion users by 2029. UberEats is a leading player in this market, offering restaurants significant opportunities for profitability and visibility. With over 11,000 cities in 45 countries and 88 million monthly active users, UberEats can help modern and newly established restaurants reach a global audience."
            },
            {
                heading: "Why Register on UberEats?",
                text: "High Revenue Potential: UberEats generated $12.2 billion in 2023, making it a top platform for restaurant visibility and revenue. Large User Base: Access to 88 million monthly active users worldwide. Global Reach: Presence in over 11,000 cities across 45 countries. Partner Benefits: Increased discoverability, promotional tools, and streamlined operations."
            },
            {
                heading: "Step-by-Step Registration Process",
                steps: [
                    {
                        title: "Prerequisites: Gather Required Documents",
                        details: [
                            "Updated menu list",
                            "Hours of operation",
                            "Food license issued by local authorities"
                        ]
                    },
                    {
                        title: "Step 1: Getting Started",
                        details: [
                            "Visit Uber Eats’ official website.",
                            "Scroll to the bottom and select 'Add your restaurant.'"
                        ]
                    },
                    {
                        title: "Step 2: Sign Up Your Restaurant",
                        details: [
                            "Fill out details such as address, store name, and brand name.",
                            "Use accurate address and contact information."
                        ]
                    },
                    {
                        title: "Step 3: Upload Menu",
                        details: [
                            "Provide a detailed menu with descriptions, hygiene information, and prices.",
                            "Use high-resolution photos of your dishes."
                        ]
                    },
                    {
                        title: "Step 4: Personalize Dashboard",
                        details: [
                            "Customize your restaurant’s dashboard on the platform."
                        ]
                    },
                    {
                        title: "Step 5: Wait for Approval",
                        details: [
                            "Approval typically takes around two days. For multiple locations, it may take longer."
                        ]
                    }
                ]
            },
            {
                heading: "Benefits of Partnering with UberEats",
                points: [
                    "New Customer Outreach: Reach millions of potential customers beyond on-premise dining.",
                    "Boost Sales: Utilize promotional tools like buy-one-get-one-free offers to enhance brand exposure.",
                    "Increase Revenue: Higher sales and revenue through platform optimization and attractive deals.",
                    "Reduce Overhead Costs: UberEats handles delivery logistics, reducing the need for your own delivery team.",
                    "Delivery Satisfaction: Ensures timely delivery and customer satisfaction.",
                    "Access Operational Tools: Utilize tools for flexible pricing, order fulfillment, and more."
                ]
            },
            {
                heading: "FAQs",
                questions: [
                    {
                        question: "How long does it take to become a partner?",
                        answer: "Typically a few days; longer for multiple locations."
                    },
                    {
                        question: "How does pricing work?",
                        answer: "Initial signup costs for professional services; subscription fee based on order volume."
                    },
                    {
                        question: "Who handles each delivery?",
                        answer: "UberEats manages deliveries through their network of drivers, but you can keep your own delivery team if preferred."
                    },
                    {
                        question: "What tools do restaurant partners receive?",
                        answer: "Marketing tools, tablets, welcome kits, and professional photo shoots."
                    },
                    {
                        question: "What percentage does Uber Eats take?",
                        answer: "Up to 30% of the order value, depending on the agreement."
                    },
                    {
                        question: "Does Uber Eats or DoorDash pay more?",
                        answer: "UberEats typically charges more in commissions compared to DoorDash."
                    },
                    {
                        question: "How many restaurant partners does Uber Eats have?",
                        answer: "Over 890,000 restaurant partners worldwide."
                    }
                ]
            }
        ]
    },
    
    {
        _id: '2',
        title: 'Top 15 Design Elements Every Restaurant Website Must Have',
        summary: 'These gourmet burger joints are flipping deliciousness to a whole new level.',
        imageUrl: blog1,
        category: 'Restaurant Business',
        restaurantName: 'Burger Haven',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '3',
        title: 'AI in Restaurants: How AI Transforming the Food Industry',
        summary: 'Explore the best vegan dining options with flavors that even meat lovers will crave.',
        imageUrl: blog1,
        category: 'Technology',
        restaurantName: 'Urban Eats',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '4',
        title: 'How to Create a Successful Cloud Kitchen',
        summary: 'A guide to setting up and running a cloud kitchen successfully.',
        imageUrl: blog1,
        category: 'Cloud Kitchen',
        restaurantName: 'Burger Haven',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '5',
        title: 'Marketing Strategies for New Restaurants',
        summary: 'Effective marketing strategies to make your restaurant stand out.',
        imageUrl: blog1,
        category: 'Marketing Strategies',
        restaurantName: 'Burger Haven',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '6',
        title: 'Restaurant Software You Need in 2025',
        summary: 'An overview of essential software for restaurant management in 2025.',
        imageUrl: blog1,
        category: 'Restaurant Software',
        restaurantName: 'Burger Haven',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '7',
        title: 'DoorDash Top Dasher: Benefits You Need to Know',
        summary: 'Maximize your earnings by becoming a Top Dasher on DoorDash.',
        imageUrl: blog1,
        category: 'Food Delivery',
        restaurantName: 'Burger Haven',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '8',
        title: 'Creating a Business Plan for Your Restaurant',
        summary: 'Everything you need to know to create a solid business plan for your restaurant.',
        imageUrl: blog1,
        category: 'Business Plan',
        restaurantName: 'Burger Haven',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '9',
        title: 'Expanding Restaurant Sales: Strategies for 2025',
        summary: 'Innovative strategies to boost your restaurant sales in the coming year.',
        imageUrl: blog1,
        category: 'Restaurant Sales',
        restaurantName: 'Green Bites',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '10',
        title: 'Top Cloud Kitchen Trends to Watch in 2025',
        summary: 'Stay ahead of the curve by understanding the latest trends in cloud kitchens.',
        imageUrl: blog1,
        category: 'Cloud Kitchen',
        restaurantName: 'Green Bites',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
    {
        _id: '11',
        title: 'Top Food Ordering System to Watch in 2025',
        summary: 'Stay ahead of the curve by understanding the latest trends in cloud kitchens.',
        imageUrl: blog1,
        category: 'Food Ordering System',
        restaurantName: 'Green Bites',
        admin: 'Foodiv',
        date: 'June 26, 2024'
    },
];

const categories = [
    'All',
    'Business Plan',
    'Cloud Kitchen',
    'Food Delivery',
    'Food Ordering System',
    'Marketing Strategies',
    'Restaurant Business',
    'Restaurant Sales',
    'Restaurant Software',
];


export default function BlogDetail() {


    const { id, category } = useParams();
    const blog = newsData.find((news) => news._id === id);

    return (
        <div className="container mt-20  mx-auto py-10 px-4 lg:px-20">

            <div className='mb-5 text-gray-700 text-xl '>Home / Blog / {blog.category}...</div>

            <div className='mb-5 text-5xl text-gray-800 px-20 leading-tight font-bold text-center  '>
                How to Register Your Restaurant to UberEats Platform?
            </div>
            <div className='text-gray-700 text-lg text-center mb-5'>
                Are you running your restaurant without registering on the UberEats platform? You are forbidding your restaurant from being discoverable by millions of users registered with the platform. Explore the Uber Eats registration guide and keep your restaurant thriving.
            </div>

            <div className="flex justify-center mb-10">
                <div className='text-orange-500 text-center border border-orange-500 border-dotted w-fit px-3 rounded-sm'>
                    {blog.category}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                <div className="lg:w-1/3">
                    <div className="sticky top-20">
                        <div className="mb-4">

                            <div className='w-full h-full mb-4 bg-black p-5 rounded-r-md'>
                                <div className='flex items-center justify-center mb-4'>
                                    <IoIosMail className='text-white size-8 mr-4' />
                                    <p className='text-xl text-white font-medium'>Subscribe!</p>
                                </div>
                                <div className='flex space-x-2 mb-6 justify-center'>
                                    {/* <IoIosMail className='p-2 size-9 bg-orange-500 rounded-full text-white' /> */}
                                    <FaInstagram className='p-2 size-9 bg-orange-500 rounded-full text-white' />
                                    <FaTwitter className='p-2 size-9 bg-orange-500 rounded-full text-white' />
                                    <FaFacebookF className='p-2 size-9 bg-orange-500 rounded-full text-white' />
                                    <TfiYoutube className='p-2 size-9 bg-orange-500 rounded-full text-white' />
                                    <FaPinterestP className='p-2 size-9 bg-orange-500 rounded-full text-white' />
                                </div>
                                <div className="flex items-center justify-center w-full mb-2">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter Email"
                                        className="p-3 text-sm border border-gray-300 rounded-l-lg focus:outline-none f h-12 w-full"
                                    />
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 text-sm rounded-r-lg transition-colors duration-300 ease-in-out h-12 w-32">
                                        Subscribe
                                    </button>
                                </div>
                            </div>


                            <h2 className="text-xl font-bold mb-4">Most Recent Articles</h2>
                            <div className='h-[1px] bg-gray-500 w-full mb-4'></div>
                            <ul>
                                {newsData.slice(0, 5).map((newsItem) => (
                                    <Link to={`/blog/${newsItem.category}/${newsItem._id}`} >
                                        <li key={newsItem._id} className="flex space-x-4 mb-6">

                                            <div className="w-1/2">
                                                <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-auto" />
                                            </div>

                                            {/* Right Side - Content */}
                                            <div className="w-1/2">
                                                <p className="text-lg font-semibold mb-1 leading-tight line-clamp-2">
                                                    {newsItem.title}
                                                </p>

                                                <div className="">
                                                    <div className='flex items-center text-base'>

                                                        <FaCalendarDays className='mr-2' />
                                                        <span>{newsItem.date}</span>
                                                    </div>

                                                    <div className='text-orange-500 '>
                                                        {newsItem.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>


                        <div className="sticky top-[calc(100vh-300px)]">
                            <img
                                src={elevate}
                                alt="Ad or Category Image"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>


                <div className="lg:w-3/4">
                    {/* <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                    <p className="text-gray-700 mb-6">{blog.summary}</p> */}

                    <div className='flex mb-4'>
             <div className='flex items-center text-orange-500 mr-2'><FaUser className='mr-1 text-black'/>{blog.admin}</div>
              <div className='flex items-center'><FaCalendarDays className='mr-1'/>{blog.date}</div>
             </div>
                    <div className="content">

                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full mb-4"
                        />
                   <main>
        {blog?.content.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
            {section.text && <p className="text-gray-800 mb-4">{section.text}</p>}
            {section.steps && (
              <div>
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <ul className="list-disc pl-5">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-gray-700 mb-1">{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {section.points && (
              <ul className="list-disc pl-5 mb-4">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-gray-700 mb-1">{point}</li>
                ))}
              </ul>
            )}
            {section.questions && (
              <div>
                {section.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-4">
                    <h3 className="text-xl font-semibold mb-1">{question.question}</h3>
                    <p className="text-gray-700">{question.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
                        {/* Add more content as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

// export default BlogDetail;