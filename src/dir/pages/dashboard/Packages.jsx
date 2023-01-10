import React from "react";
import Card from "../../components/Card";
import SideNav from "../../components/SideNav";
import Top from "../../components/Top";
import {  FaPaypal  } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as Img from "../../components/Images";
import { useNavigate } from "react-router-dom";

function Packages() {

  const navigate = useNavigate()
const handlePackage = () => {
navigate('/deposit')
}

  return (
    <div className="w-full">
      <SideNav />
      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className="hidden md:block w-60 h-full"></div>
        <div className="flex-1 flex-wrap px-4">
          <Top />

          <div className=" flex-wrap  md:flex ">
          <div className=" flex-wrap  md:flex ">
            
            <div className="flex justify-center md:justify-start mt-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <Card
                clickMe="Choose" click={() => handlePackage() }
                name="Silver"
                icon='$2,000'
                value={0.0}
                classes="flex h-full bg-blue-900  w-60 rounded-xl"
              />
            </div>

            <div className="flex justify-center md:justify-start mt-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <Card
                clickMe="Choose" click={() => handlePackage() }
                name="Gold"
                icon='$5,000'
                classes="flex h-full bg-blue-900  w-60 rounded-xl"
              />
            </div>
            <div className="flex justify-center md:justify-start mt-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <Card
                clickMe="Choose" click={() => handlePackage() }
                name="Plantinum"
                icon='$10,000'
                onClick={() => alert("jhasas")}
                classes="flex h-full bg-purple-900  w-60 rounded-xl"
              />
            </div>
            <div className="flex justify-center md:justify-start mt-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <Card
                clickMe="Choose" click={() => handlePackage() }
                name="Premium"
                icon='$25,000'
                classes="flex h-full bg-yellow-600  w-60 rounded-xl"
              />
            </div>
            

            <div className="flex justify-center md:justify-start mt-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <Card
                clickMe="Choose" click={() => handlePackage() }
                name="VIP"
                icon='$50,000'
                classes="flex h-full bg-blue-900 w-60 rounded-xl"
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;
