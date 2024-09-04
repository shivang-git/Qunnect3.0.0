"use client";
import React, { useEffect, useCallback, useState } from "react";

import {
  Calculator,
  Calendar,
  Command,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/ui/command";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchResults,
  searchContact,
} from "../features/messages/messageSlice";
import { Avatar } from "@radix-ui/react-avatar";

const ContactSearch = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { Contacts } = useSelector((state) => state.messages);

  const handleSearch = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const debouncedHandleInput = useCallback(
    debounce((value) => {
      // if (value.trim() === "") {
      //   dispatch(clearSearchResults());
      //   return;
      // }
      dispatch(searchContact(value));
    }, 300),
    [] // Empty dependency array to prevent recreating debounced function on every render
  );

  const handleInput = (e) => {
    const value = e.target.value;
    debouncedHandleInput(value);
  };

  const handleContactClick = (contact) => {
    console.log(contact);
  };

  return (
    <>
      <button
        onClick={handleSearch}
        className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput onInput={handleInput} placeholder="Type something..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Contacts">
            {Contacts
              ? Contacts.map((contact) => (
                  <div onClick={() => handleContactClick(contact)}>
                    <CommandItem>
                      <Avatar className="mr-2 h-4 w-4" />
                      <span>{contact.fullname}</span>
                    </CommandItem>
                  </div>
                ))
              : ""}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ContactSearch;
