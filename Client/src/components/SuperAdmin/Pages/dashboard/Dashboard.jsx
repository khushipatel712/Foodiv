import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaUsers, FaChartLine, FaBell, FaImage, FaBlog, FaCertificate, FaProductHunt, FaCommentDots } from 'react-icons/fa';

export default function Dashboard() {
  useEffect(() => {
    gsap.fromTo(".dashboard-header", 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    gsap.fromTo(".dashboard-cards", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.3,  }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="dashboard-header mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-md text-gray-600 mt-2">Manage your admin panel efficiently.</p>
      </header>

      {/* Dashboard Cards */}
      <section className="dashboard-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Clients */}
        <div className="bg-gradient-to-r from-teal-300 to-teal-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaUsers className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Clients</h2>
            <p className="text-white mt-1 text-center">Manage and view client information.</p>
          </div>
        </div>

        {/* Card 2: Banners */}
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaImage className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Banners</h2>
            <p className="text-white mt-1 text-center">Manage and update banners.</p>
          </div>
        </div>

        {/* Card 3: Blogs */}
        <div className="bg-gradient-to-r from-green-300 to-green-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaBlog className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Blogs</h2>
            <p className="text-white mt-1 text-center">Create and manage blog posts.</p>
          </div>
        </div>

        {/* Card 4: Certificates */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaCertificate className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Certificates</h2>
            <p className="text-white mt-1 text-center">Issue and track certificates.</p>
          </div>
        </div>

        {/* Card 5: Products */}
        <div className="bg-gradient-to-r from-red-300 to-red-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaProductHunt className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Products</h2>
            <p className="text-white mt-1 text-center">Manage your product inventory.</p>
          </div>
        </div>

        {/* Card 6: Testimonials */}
        <div className="bg-gradient-to-r from-purple-300 to-purple-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaCommentDots className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Testimonials</h2>
            <p className="text-white mt-1 text-center">Read and manage customer testimonials.</p>
          </div>
        </div>

        {/* Card 7: Data */}
        <div className="bg-gradient-to-r from-gray-300 to-gray-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaChartLine className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Data</h2>
            <p className="text-white mt-1 text-center">Analyze and review data trends.</p>
          </div>
        </div>

        {/* Card 8: Alerts */}
        <div className="bg-gradient-to-r from-orange-300 to-orange-500 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex items-center space-x-4">
          <FaBell className="text-white text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-white text-center">Alerts</h2>
            <p className="text-white mt-1 text-center">Monitor and manage system alerts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
