import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SideNav from "../../components/SideNav";
import Top from "../../components/Top";

export default function Read() {
  return (
    <div className="w-full">
      <SideNav />
      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className="hidden md:block w-60 h-full "></div>
        <div className="flex-1 flex-wrap px-4">
          <Top /> 
          <div className=" flex-wrap  md:flex ">
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg w-full mt-12">
           <span className="font-base text-base">   To access this inventory, you must create a code for a new user. This code is to avois random people from creating accounts. Due to the policy of this free hosting provider, only the front end and mock data is being uploaded. The alert functionality is complete backend. Below are the functionality this app contains.</span>
              <ol  className="list-inside pl-5 w-full list-decimal space-y-3 antialiased tracking-wide mt-4 text-sm">
                <li> Only registered administrators are allowed to access the inventory.</li>
                <li> You can add more inventory to the application.</li>
                <li> Users or owners will get update directly to their email and phones one month before a product expires and will continue to get mail updates weeekly before the expiry date. </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
