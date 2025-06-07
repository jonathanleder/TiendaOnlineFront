import React from 'react';
import MyNavbar from './MyNavbar';
import {Outlet} from "react-router-dom";


function Layout() {
    return (
        <>
            <MyNavbar />
            <div className="container mt-4">
                <Outlet/>

            </div>
        </>
    );
}

export default Layout;