import React from 'react';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

const SubscriptionPlan = () => {
    const allFeatures = [
        'Unlimited Orders',
        'Free Menu Setup *',
        'Unlimited Menu Item',
        'No Commission on Orders',
        'Unlimited Scans',
        'QR Code Based Ordering',
        'Product Variants',
        'Product Add-Ons',
        'Custom Payment Gateway',
        'Website Builder',
        'Point Custom Domain',
        'Free SSL',
        'KOT',
        'Online POS',
        'Take order digitally',
        'Coupons / Offers',
        'Reports',
        'Google Analytics',
        'Pre Ordering',
        'Table / Room Ordering',
        'Waiter Management',
        'Delivery Boy Management',
        'Multiple Languages',
        'Inventory Management',
        'Loyalty Program',
        'Customer Application',
    ];

    const plans = [
        {
            name: 'BASIC PLAN',
            price: 'Free',
            features: [
                'Unlimited Orders',
                'Free Menu Setup *',
                'Unlimited Menu Item',
                'No Commission on Orders',
                'Unlimited Scans',
                'QR Code Based Ordering',
            ],
        },
        {
            name: 'STANDARD PLAN',
            price: 'INR 2999 / Year per Outlet',
            features: [
                'Unlimited Orders',
                'Free Menu Setup *',
                'Unlimited Menu Item',
                'No Commission on Orders',
                'Unlimited Scans',
                'QR Code Based Ordering',
                'Product Variants',
                'Product Add-Ons',
                'Custom Payment Gateway',
                'Website Builder',
                'Point Custom Domain',
                'Free SSL',
                'KOT',
            ],
        },
        {
            name: 'PLUS PLAN',
            price: 'INR 5999 / Year per Outlet',
            features: [
                'Unlimited Orders',
                'Free Menu Setup *',
                'Unlimited Menu Item',
                'No Commission on Orders',
                'Unlimited Scans',
                'QR Code Based Ordering',
                'Product Variants',
                'Product Add-Ons',
                'Custom Payment Gateway',
                'Website Builder',
                'Point Custom Domain',
                'Free SSL',
                'KOT',
                'Online POS',
                'Take order digitally',
                'Coupons / Offers',
                'Reports',
                'Google Analytics',
                'Pre Ordering',
                'Table / Room Ordering',
            ],
        },
        {
            name: 'PREMIUM PLAN',
            price: 'INR 19999 / Year per Outlet',
            features: [
                'Unlimited Orders',
                'Free Menu Setup *',
                'Unlimited Menu Item',
                'No Commission on Orders',
                'Unlimited Scans',
                'QR Code Based Ordering',
                'Product Variants',
                'Product Add-Ons',
                'Custom Payment Gateway',
                'Website Builder',
                'Point Custom Domain',
                'Free SSL',
                'KOT',
                'Online POS',
                'Take order digitally',
                'Coupons / Offers',
                'Reports',
                'Google Analytics',
                'Pre Ordering',
                'Table / Room Ordering',
                'Waiter Management',
                'Delivery Boy Management',
                'Multiple Languages',
                'Inventory Management',
                'Loyalty Program',
                'Customer Application',
            ],
        },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Subscription Plan</h2>
            <div className='w-full px-4 h-[0.5px] bg-gray-300 mb-6'></div>
            <p className="mb-4 text-lg font-medium">Get Your Restaurant Online Today!</p>
            <p className="mb-6">Long delivery times and online ordering limitations affecting your business? Get started with online ordering systems for your restaurant and say goodbye to manually handling orders.</p>
            <div className='p-4 py-6 font-medium mx-10 bg-gray-100 mb-6 flex items-center justify-center'>
                <p>No commission Per Order | No Setup fee | No contracts | No Credit Card required</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {plans.map(plan => (
                    <div key={plan.name} className="border p-4 rounded-xl shadow mb-4">
                        <p className="text-xl font-semibold">{plan.name}</p>
                        <p className="text-base mb-4">{plan.price}</p>
                        <div className='w-full px-4 h-[0.5px] bg-gray-300 mb-6'></div>
                        <div className="mt-2">
                            {allFeatures.map(feature => (
                                <div className='flex justify-stretch m-2 text-gray-400 items-center text-sm lg:flex-nowrap' key={feature}>
                                    {plan.features.includes(feature) ? (
                                        <IoMdCheckmarkCircleOutline className='mx-2 text-green-400' />
                                    ) : (
                                        <IoMdCloseCircleOutline className='mx-2 text-red-500' />
                                    )}
                                    {feature}
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 bg-gray-400 text-white px-3 py-2 hover:bg-gray-500 rounded-sm">
                            Choose {plan.name.split(' ')[0]} {/* Extracts the plan type */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPlan;
