'use client'

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { persistor } from "../app/store";
import { Home, MessageSquare, Users, Bell, Grid, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user.user);
  const [menu, setMenu] = useState(false);

  const handleClick = async () => {
    await persistor.purge();
    dispatch(logoutUser());
  };

  return (
    (<nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                alt="LinkedIn" />
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex flex-col items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                  }`
                }>
                <Home size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  `flex flex-col items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                  }`
                }>
                <MessageSquare size={20} />
                <span>Messaging</span>
              </NavLink>
              <NavLink
                to="/canvas"
                className={({ isActive }) =>
                  `flex flex-col items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                  }`
                }>
                <Grid size={20} />
                <span>Canvas</span>
              </NavLink>
              <NavLink
                to="/find-friends"
                className={({ isActive }) =>
                  `flex flex-col items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                  }`
                }>
                <Users size={20} />
                <span>Network</span>
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="relative p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
              </button>
            </div>
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setMenu(!menu)}
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user}
                    alt="" />
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </div>
              {menu && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu">
                  <NavLink
                    to={`/profile/${user.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem">
                    Your Profile
                  </NavLink>
                  <NavLink
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem">
                    Settings
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handleClick}>
                    Sign out
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`
              }>
              Home
            </NavLink>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`
              }>
              Messages
            </NavLink>
            <NavLink
              to="/canvas"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`
              }>
              Canvas
            </NavLink>
            <NavLink
              to="/find-friends"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`
              }>
              Find Friends
            </NavLink>
          </div>
        </div>
      )}
    </nav>)
  );
};

export default Navbar;