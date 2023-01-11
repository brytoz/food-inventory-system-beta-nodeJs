import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SideNav from "../../components/SideNav";
import { useQuery } from "react-query";
import Top from "../../components/Top";
import axios from "axios";
import { datas } from "../../components/data";
import {BsFillTrashFill} from 'react-icons/bs'

export default function Index() {
  axios.defaults.withCredentials = true;
  const { data, isError, isLoading } = useQuery(
    ["products"],
    async () => await axios.get(`${process.env.REACT_APP_DB}/getproducts`)
  );

  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  async function deletePost(id) {
    try {
      await axios
        .post(`${process.env.REACT_APP_DB}/delete-post`, {
          id: id,
        })
        .then(async (result) => {
          setStatus(result.data);
          setTimeout(() => {
            window.location.reload(true);
          }, 3000);
        });
    } catch (err) {
      // console.log(err.message);
    }
  }

  const Adrod = () => {
    return (
      <>
        <div className=" rounded-lg flex items-center justify-center  ">
          <div className="flex content-center items-center  align-middle justify-center">
            <div className="bg-yellow-300 rounded-lg font-semibold p-2">
              <h1 className="text-center block">Product Expiry</h1>

              <div className="text-sm font-normal block pt-5 ">
                The product{" "}
                <span className="bg-green-400 p-1 rounded-lg font-bold text-white">
                  1 Kilo Chicken D9
                </span>{" "}
                is still in stock and it is scheduled to expire in the next{" "}
                <span className="bg-green-400 p-1 rounded-lg font-bold text-white">
                  30days
                </span>
              </div>
              <div className="w-full flex items-center justify-center pt-5 ">
                <div
                  onClick={() => setShow(false)}
                  className="text-center p-1 cursor-pointer rounded bg-red-500 px-5  text-white "
                >
                  close
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10000);
  }, []);

  return (
    <div className="w-full relative">
      <SideNav />

      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className="hidden md:block w-60 h-full "></div>
        <div className="flex-1 flex-wrap px-4">
          <Top />
          {show && <Adrod />}
          {status}
          <div className=" flex-wrap  md:flex ">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full mt-12">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Product name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Expiry
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data && 
                  data.data.map((datas) => (
                 
                      <tr
                        key={datas.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {datas.product_name}
                        </th>
                        <td className="py-4 px-6">{datas.status}</td>
                        <td className="py-4 px-6">{datas.category}</td>
                        <td className="py-4 px-6">{datas.price}</td>
                        <td className="py-4 px-6">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            {datas.expiry}
                          </a>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            title="Delete Post"
                            onClick={() => deletePost(datas.id)}
                          >
                            <BsFillTrashFill
                              className="cursor-pointer text-red-600"
                              size={26}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
