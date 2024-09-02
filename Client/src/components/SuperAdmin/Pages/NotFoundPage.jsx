// NotFoundPage.jsx
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Handle going back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full lg:w-[70%] bg-white p-5 lg:p-10 rounded-lg shadow">
      {/* Back Button */}
      <div className='px-32'>
        <div className='flex flex-row gap-4 items-center'>
          <div>
            <button
              className="hover:text-orange-700 mb-4"
              onClick={goBack}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="text-lg font-medium mb-4 text-orange-600">Page Not Found</div>
        </div>

        {/* 404 Message */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
          <p className="text-lg text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
          <p className="text-lg text-gray-700 mb-4">It might have been moved or deleted.</p>
          <button
            onClick={goBack}
            className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg border border-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
