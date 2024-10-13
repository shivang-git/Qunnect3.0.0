'use client'

import React from "react";
import {Link} from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, MapPin, Link as LinkIcon, Twitter, Github, Linkedin } from "lucide-react";

export const ProfileCard = ({ user }) => {
  return (
    (<Card className="max-w-md w-full">
      <div className="relative">
        <img
          src={user.user.profileBanner}
          alt="Banner Profile"
          className="w-full h-32 object-cover rounded-t-lg" />
        <div className="absolute -bottom-16 left-4">
          <img
            src={user.user.profilePhoto}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-background" />
        </div>
      </div>
      <CardContent className="pt-20 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              <Link to={`/profile/${user.user.slug}`} className="hover:underline">
                {user.user.fullname}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground">{user.user.headline || "Professional Headline"}</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Verified
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {user.bio}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{user.user.location || "San Francisco Bay Area"}</span>
          <LinkIcon className="h-4 w-4 ml-4 mr-2" />
          <a href="#" className="text-primary hover:underline">
            {user.user.website || "www.example.com"}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Button variant="outline" size="sm">
            <Twitter className="flex-1 h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            <Github className=" flex-1 h-4 w-4 mr-2" />
            GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Linkedin className=" flex-1 h-4 w-4 mr-2" />
            LinkedIn
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-center">
          <span className="block font-bold text-lg">1.5k</span>
          <span className="text-xs text-muted-foreground">Followers</span>
        </div>
        <div className="text-center">
          <span className="block font-bold text-lg">120</span>
          <span className="text-xs text-muted-foreground">Following</span>
        </div>
        <div className="text-center">
          <span className="block font-bold text-lg">350</span>
          <span className="text-xs text-muted-foreground">Posts</span>
        </div>
      </CardFooter>
    </Card>)
  );
};