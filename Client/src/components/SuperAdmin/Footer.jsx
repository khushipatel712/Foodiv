import React from "react";
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const products = [
    { name: "Online ordering", link: "#" },
    { name: "Pizza Ordering", link: "#" },
    { name: "Cloud Kitchen Ordering", link: "#" },
    { name: "Cafe Ordering", link: "#" },
    { name: "Alcohol Delivery Software", link: "#" },
    { name: "Takeaway Ordering System", link: "#" },
    { name: "Pre-Order & Catering System", link: "#" },
    { name: "Tableside Ordering System", link: "#" },
    { name: "Restaurant Management Software", link: "#" },
    { name: "Mobile Order & Pay", link: "#" },
    { name: "Restaurant POS System", link: "#" },
    { name: "Kitchen Display System", link: "#" },
  ];

  const resources = [
    { name: "Pricing", link: "#" },
    { name: "Contact Us", link: "#" },
    { name: "Partners", link: "#" },
    { name: "Terms & conditions", link: "#" },
    { name: "Privacy Policy", link: "#" },
    { name: "Refund & Cancellation Policy", link: "#" },
  ];

  const socialIcons = [
    { icon: faInstagram, link: "https://www.instagram.com/" },
    { icon: faFacebookF, link: "https://www.facebook.com/" },
    { icon: faTwitter, link: "https://twitter.com/" },
    { icon: faYoutube, link: "https://www.youtube.com/" },
    { icon: faPinterestP, link: "https://www.pinterest.com/" },
  ];

  return (
    <footer className="bg-gray-100 py-8  lg:px-20 px-5">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {/* Logo and Address */}
        <div className="col-span-1">
          <img src={logo} alt="Logo" className="mb-4" />
          <p className="text-black">
            3939 N 26th Street,<br />
            Lincoln, Nebraska 68521, USA
          </p>
          <p className="text-black mt-2">contact@foodiv.com</p>
        </div>

        {/* Products */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">Products</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index} className="text-black mb-2">
                <a href={product.link} className="hover:text-orange-500">
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">Resources</h3>
          <ul>
            {resources.map((resource, index) => (
              <li key={index} className="text-black mb-2">
                <a href={resource.link} className="hover:text-orange-500">
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                className="text-gray-700 hover:text-orange-500"
              >
                <FontAwesomeIcon icon={social.icon} className="size-7 text-black" />
              </a>
            ))}
          </div>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-32"
            />
          </a>
        </div>
      </div>
      <div className="text-center mt-8 text-xl text-black">
        ©2024 <a href="#" className="text-orange-600">Blue Fusion Enterprise LLP</a> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
