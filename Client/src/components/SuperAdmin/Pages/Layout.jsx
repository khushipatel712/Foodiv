import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Outlet /> {/* This Outlet will render the Home component */}
            </div>
            <Footer />
        </>
    );
};

export default Layout;
