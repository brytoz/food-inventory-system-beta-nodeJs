import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SideNav from "../../components/SideNav";
import Top from "../../components/Top";
import axios from "axios";

export default function AddProducts() {
  axios.defaults.withCredentials = true;
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState('')

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [unknown, setUnknown] = useState('');
  
  const handleProduct = async (e) => {

    e.preventDefault();


    try{

       await axios.post(`${process.env.REACT_APP_DB}/products`,   {
        product_name: productName,
        category,
        expiry:date,
        price,
        
    }).then((result) => {

        if(result.status === 200) {
            setSuccess(true)
            setStatus(result.data)
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        } else {
            setError(true)
            setStatus(result.data)
        }

        setTimeout(() => {
            setStatus('')
            setSuccess(false)
            setError(false)
        }, 10000);
        
        console.log(result);
    });
    } catch(err){
        console.log(err);
    }
}


  return (
    <div className="w-full">
      <SideNav />
      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className="hidden md:block w-60 h-full "></div>
        <div className="flex-1 flex-wrap px-4">
          <Top />
          <div className=" flex-wrap  md:flex m-4 ">

            <div className="text-2xl font-bold mb-4">Add Inventory</div>
            <div className="flex justify-center ">
            {error && (
              <span className="text-center text-red-600 bold">
                {status}
              </span>
            )} 
            {success && (
              <span className="text-center text-xl text-green-600 bold">
                Success! Redirecting...
              </span>
            )}
             
          </div>
            <form onSubmit={handleProduct} className="w-full w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Product Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                  onChange={(e) => setProductName(e.target.value)}
                    type="text"
                    placeholder="Bag of Rice"
                  />
                  
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select 
                    value={category}
                  onChange={(e) => setCategory(e.target.value)}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     
                      id="grid-state"
                    >
                      <option  value="">Select Categogy</option>
                      <option  value="Cereals">Cereals</option>
                      <option  value="Vegetables">Vegetables</option>
                      <option  value="Diaries">Diaries</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
               
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    Price
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                  onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="3,000"
                  />
                </div>
                 
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    Expiry Date
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                    placeholder="90210"
                  />
                </div>

                <button type="submit" className="mx-3 mt-6 cursor-pointer font-bold w-full rounded  p-3 text-center bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-white">
Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
