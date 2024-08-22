import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

const AdminLayout = () => {
    return (
        <div className="flex flex-col  ">
            <Header />
            <div className="flex flex-1 ">
                <Sidebar />
                <div className="flex-1 p-4 overflow-y-auto">
                    <Outlet /> {/* This Outlet will render the Admin pages */}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
