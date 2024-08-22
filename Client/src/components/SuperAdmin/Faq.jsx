import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const faqs = [
    {
        question: "What is Foodiv?",
        answer: "Foodiv is an online food ordering system that helps restaurants bring their services online in a hassle-free manner."
    },
    {
        question: "How does Foodiv work?",
        answer: "Foodiv integrates with your restaurant’s existing setup and allows customers to order food online through a user-friendly interface."
    },
    {
        question: "What are the benefits of using Foodiv?",
        answer: "Foodiv offers a seamless online ordering experience, free QR code menus, and increased control over customer data, all without commissions."
    },
    {
        question: "How does Foodiv work?",
        answer: "Foodiv integrates with your restaurant’s existing setup and allows customers to order food online through a user-friendly interface."
    },
    {
        question: "What are the benefits of using Foodiv?",
        answer: "Foodiv offers a seamless online ordering experience, free QR code menus, and increased control over customer data, all without commissions."
    },
    // Add more FAQs as needed
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full  mt-20 lg:px-20 px-5">
        <div className="text-center mb-10 flex justify-center flex-col items-center">
                <div>
                    <h2 className="lg:text-4xl text-3xl font-sans font-medium">
                       Frequently Asked Questions
                    </h2>
                </div>
                <div className='w-32 h-[3px] text-orange-500 bg-orange-500 text-center mt-4'></div>
            </div>
            {faqs.map((faq, index) => (
                <div key={index} className="mb-4 border-[1px] rounded-md">
                    <div
                       className={`flex justify-between items-center p-4 cursor-pointer ${openIndex === index ? 'text-orange-500' : 'text-black'}`} 
                        onClick={() => toggleFAQ(index)}
                    >
                        <h3 className="text-lg text-gray-900 font-medium">{faq.question}</h3>
                        <span className="text-2xl">
                            {openIndex === index ?  <FaMinus className='h-5 w-5'/> : <FaPlus className='h-5 w-5'/>}
                        </span>
                    </div>
                    {openIndex === index && (
                        <div className="p-4 mx-4 border-t border-orange-500">
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
