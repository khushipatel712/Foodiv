import React from 'react';
import svg1 from 'D:/Node and React/Foodiv/Client/public/assests/scaner.svg'

const Manage1 = () => {
    const items = [
        { name: 'Store QR Code', icon: svg1 },
        { name: 'Delivery Settings', icon: svg1 },
        { name: 'TAX Settings', icon:svg1 },
        { name: 'Order Settings', icon: svg1 },
        { name: 'Payment Gateway Settings', icon: svg1 },
        { name: 'Domain Settings', icon: svg1 },
        { name: 'Manage Outlets', icon: svg1 },
        { name: 'Menu Management', icon: svg1 },
        { name: 'Coupons', icon: svg1 },
        { name: 'Managers', icon: svg1 },
        { name: 'Manage Waiters', icon: svg1 },
        { name: 'Manage Delivery Boys', icon: svg1},
        { name: 'My Customers', icon: svg1},
        { name: 'Manage Tables', icon:svg1 },
        { name: 'Restaurant Time Settings', icon: svg1},
        { name: 'Support Settings', icon: svg1 },
        { name: 'SMTP Settings', icon: svg1 },
        { name: 'Custom App Notifications', icon: svg1 },
        { name: 'Notification Settings', icon:svg1 },
        { name: 'Inventory Management', icon: svg1 },
        { name: 'Language Settings', icon: svg1 },
        { name: 'Loyalty Program', icon: svg1 },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.name} className="flex items-center border px-4 py-2 rounded-lg ">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-2">
                            <img src={item.icon} alt={item.name} className="w-6 h-6" />
                        </div>
                        <span className='text-base'>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Manage1;
