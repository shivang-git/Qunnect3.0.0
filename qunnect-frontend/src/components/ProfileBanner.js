'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from "./ui/button"
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react"

const ProfileBanner=({ openEditprofile, user })=> {
  const currUser = useSelector((state) => state.auth.user.user)

  return (
    (<div className="bg-background">
      <div
        className="w-full bg-cover bg-no-repeat bg-center h-half"
        style={{
          height: 200,
          backgroundImage: `url(${user?.profileBanner})`
        }}>
        <img
          className="opacity-0 w-full h-full"
          src={user?.profileBanner}
          alt="Profile Banner" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="sm:flex sm:items-end sm:space-x-5 pb-4 sm:pb-6">
          <div className="relative -mt-16 sm:-mt-20">
            <img
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-background"
              src={user.profilePhoto}
              alt={user.fullname} />
          </div>
          <div
            className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-foreground truncate">{user.fullname}</h1>
            </div>
            {currUser._id === user._id && (
              <div
                className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button variant="outline" onClick={() => openEditprofile(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-foreground truncate">{user.fullname}</h1>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">{user.bio}</p>
          <div
            className="mt-4 flex flex-wrap items-center text-sm text-muted-foreground">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0" />
            <span>San Francisco, CA</span>
            <LinkIcon className="ml-4 mr-1.5 h-5 w-5 flex-shrink-0" />
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline">
              www.google.com
            </a>
            <CalendarIcon className="ml-4 mr-1.5 h-5 w-5 flex-shrink-0" />
            <span>Joined December, 2019</span>
          </div>
        </div>
        <div className="mt-6 flex space-x-8 border-t border-border pt-2 pb-3">
          <div className="text-sm font-medium text-muted-foreground">
            <span className="text-foreground font-semibold">520</span> Following
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            <span className="text-foreground font-semibold">2M</span> Followers
          </div>
        </div>
      </div>
    </div>)
  );
}

export default ProfileBanner;