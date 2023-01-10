import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SideNav from "../../components/SideNav";
import { FaPaypal } from "react-icons/fa";
import Top from "../../components/Top";

function Deposit() {
  const [text, setCovpied] = useState("sdgasgfsgsdfsdgasgfsgsdfsdgasgfsgsdf");
  const [deposit, setDeposit] = useState(false);

  return (
    <div className="w-full">
      <SideNav />
      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className="hidden md:block w-60 h-full"></div>
        <div className="flex-1 flex-wrap px-4">
          <Top />

          <div className=" flex-wrap  md:flex ">how are you my friend</div>

          <div className=" flex-wrap  md:flex ">
            <div className="w-full p-6 text-2xl bg-yellow-500 rounded text-white">
              We now support third party payment. <p></p>There have been
              conflicting interests in profit expectations in the past. Some
              users pay less and expect a higher proportional value. In other to
              avoid this conflict and serve you better, your ROI will be
              determined by your deposit from the packages listed. Copy the
              address below to make your deposit and it will be confirmed within
              24hrs.
            </div>
            <CopyAddress />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
