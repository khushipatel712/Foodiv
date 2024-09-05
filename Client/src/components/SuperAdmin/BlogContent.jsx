import React, { useState } from 'react';
import blog1 from '../../../public/assests/blog1.jpg'
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";


const newsData = [
  {
    _id: '1',
    title: 'DoorDash Top Dasher: Requirements And Benefits',
    summary: 'Discover the top restaurants and hidden gems in your city for a culinary adventure.',
    imageUrl: blog1,
    category: 'Food Delivery',
    restaurantName: 'Urban Eats',
    admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '2',
    title: 'Top 15 Design Elements Every Restaurant Website Must Have',
    summary: 'These gourmet burger joints are flipping deliciousness to a whole new level.',
    imageUrl: blog1,
    category: 'Restaurant Business',
    restaurantName: 'Burger Haven',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '3',
    title: 'AI in Restaurants: How AI Transforming the Food Industry',
    summary: 'Explore the best vegan dining options with flavors that even meat lovers will crave.',
    imageUrl: blog1,
    category: 'Technology',
    restaurantName: 'Urban Eats',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '4',
    title: 'How to Create a Successful Cloud Kitchen',
    summary: 'A guide to setting up and running a cloud kitchen successfully.',
    imageUrl: blog1,
    category: 'Cloud Kitchen',
    restaurantName: 'Burger Haven',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '5',
    title: 'Marketing Strategies for New Restaurants',
    summary: 'Effective marketing strategies to make your restaurant stand out.',
    imageUrl: blog1,
    category: 'Marketing Strategies',
    restaurantName: 'Burger Haven',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '6',
    title: 'Restaurant Software You Need in 2025',
    summary: 'An overview of essential software for restaurant management in 2025.',
    imageUrl: blog1,
    category: 'Restaurant Software',
    restaurantName: 'Burger Haven',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '7',
    title: 'DoorDash Top Dasher: Benefits You Need to Know',
    summary: 'Maximize your earnings by becoming a Top Dasher on DoorDash.',
    imageUrl:blog1 ,
    category: 'Food Delivery',
    restaurantName: 'Burger Haven',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '8',
    title: 'Creating a Business Plan for Your Restaurant',
    summary: 'Everything you need to know to create a solid business plan for your restaurant.',
    imageUrl:blog1 ,
    category: 'Business Plan',
    restaurantName: 'Burger Haven',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '9',
    title: 'Expanding Restaurant Sales: Strategies for 2025',
    summary: 'Innovative strategies to boost your restaurant sales in the coming year.',
    imageUrl: blog1,
    category: 'Restaurant Sales',
    restaurantName: 'Green Bites',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '10',
    title: 'Top Cloud Kitchen Trends to Watch in 2025',
    summary: 'Stay ahead of the curve by understanding the latest trends in cloud kitchens.',
    imageUrl: blog1,
    category: 'Cloud Kitchen',
    restaurantName: 'Green Bites',
       admin:'Foodiv',
    date:'June 26, 2024'
  },
  {
    _id: '11',
    title: 'Top Food Ordering System to Watch in 2025',
    summary: 'Stay ahead of the curve by understanding the latest trends in cloud kitchens.',
    imageUrl: blog1,
    category:  'Food Ordering System',
    restaurantName: 'Green Bites',
       admin:'Foodiv',
    date:'June 26, 2024'
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

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNews = selectedCategory === 'All'
    ? newsData
    : newsData.filter(news => news.category === selectedCategory);

  return (
    <div className="container mx-auto py-10  px-5  sm:mb-28">
      <div className="flex flex-wrap justify-center px-20 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full  border-[1.5px] border-orange-600 font-medium ${
              selectedCategory === category ? 'bg-orange-600 text-white' : 'text-orange-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-10">
        {filteredNews.map((news) => (
            <div key={news._id} className="px-2 mb-4">
            <Link to={`/blog/${news.category}/${news._id}`}>
           <div className="border cursor-pointer overflow-hidden h-full flex flex-col  justify-center hover:text-red-500 ">
             <img
               src={news.imageUrl}
               alt={news.title}
               className="w-full h-48 object-cover transform transition duration-300 ease-in-out hover:scale-110"
             />
             <div className='flex p-2 mt-2'>
             <div className='flex items-center text-orange-500 mr-2'><FaUser className='mr-1 text-black'/>{news.admin}</div>
              <div className='flex items-center'><FaCalendarDays className='mr-1'/>{news.date}</div>
             </div>


             <div className="px-4 py-2 flex flex-col flex-grow">
               <h4 className="text-2xl leading-tight text-left font-bold mb-2 hover:text-red-500 ">
                 {news.title}
               </h4>
               <p className="text-gray-600 text-lg leading-tight  text-left">{news.summary}</p>
              
             </div>
             <div className="text-center mx-24 bottom-0   bg-orange-600 text-white text-sm px-7 py-1 font-medium  rounded-t-2xl ">
                 {news.restaurantName}
               </div>
           </div>
           </Link>
       </div>
        ))}
      </div>
    </div>
  );
}


