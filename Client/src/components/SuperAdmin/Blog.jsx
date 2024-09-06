import React from 'react';
import { Link } from 'react-router-dom';
import blog1 from 'D:/Node and React/Foodiv/Client/public/assests/blog1.jpg' // Ensure this path is correct

const newsData = [
  {
    _id: '1',
    title: 'DoorDash Top Dasher: Requirements And Benefits',
    summary: 'Discover the top restaurants and hidden gems in your city for a culinary adventure.',
    imageUrl: blog1,
    restaurantName: 'Urban Eats',
  },
  {
    _id: '2',
    title: 'Top 15 Design Elements Every Restaurant Website Must Have',
    summary: 'These gourmet burger joints are flipping deliciousness to a whole new level.',
    imageUrl: blog1,
    restaurantName: 'Burger Haven',
  },
  {
    _id: '3',
    title: 'AI in Restaurants: How AI Transforming the Food Industry',
    summary: 'Explore the best vegan dining options with flavors that even meat lovers will crave.',
    imageUrl: blog1,
    restaurantName: 'Green Bites',
  },
];

const Blog = () => {
  return (
    <div className="container mx-auto lg:px-20 px-5 py-0 sm:mb-28">
      <div className="flex flex-wrap items-center justify-center -mx-2 mt-6">
        {newsData.map((news) => (
          <div key={news._id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-4">
           
              <div className="border  overflow-hidden h-full flex flex-col items-center justify-center hover:text-red-500 ">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-52 object-cover transform transition duration-300 ease-in-out hover:scale-110"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-xl text-left font-bold mb-2 hover:text-red-500 text-gray-800">
                    {news.title}
                  </h4>
                  <p className="text-gray-600 text-base mb-4 text-left">{news.summary}</p>
                 
                </div>
                <div className="text-center mx-10 bottom-0   bg-orange-600 text-white text-sm px-7 py-1 font-medium  rounded-t-2xl ">
                    {news.restaurantName}
                  </div>
              </div>
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;





