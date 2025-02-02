import React, { useState } from 'react';
import user from '../assets/icons/user.svg';
import { FaHamburger } from 'react-icons/fa';

const Header = ({ setIsPopUpOpen, toggleSidebar, isSidebarOpen }) => {
    const handleIconClick = () => {
        setIsPopUpOpen((prev) => !prev)
    };
    return (
        <header className="bg-primary fixed w-full sm:w-[72%] lg:w-[74%] xl:w-[80%] z-10 text-white h-16 flex items-center px-5 py-2 shadow-md"   
>
            <div className="flex items-center justify-between w-full flex-row-reverse  pr-4 relative" >
                <img
                    src={user}
                    alt="user"
                    className="w-9 h-9  cursor-pointer"
                    onClick={handleIconClick}
                />
                {!isSidebarOpen && (
                    <FaHamburger
                        className="size-7 md:hidden cursor-pointer"
                        onClick={toggleSidebar}
                    />
                )}

            </div>
        </header>
    );
};

export default Header;
