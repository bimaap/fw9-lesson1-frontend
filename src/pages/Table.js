import React from "react";
import * as HIcon from "react-icons/hi";
import * as FIcon from "react-icons/fa";
import * as AIcon from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redax/asyncActions/contact-us";


export default function Table(){
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contactUs.data)

  React.useEffect(()=>{
    dispatch(getData())
  }, [dispatch])

  return(
    <>
      <div className="absolute h-[50px] flex items-center justify-center rounded-b-xl bg-[#0E054D] w-full">
        <div className="w-[1100px] flex items-center space-x-5">
          <Link to='/'>
            <AIcon.AiFillContacts className="text-white text-[35px] cursor-pointer hover:text-[#F44C57]" />
          </Link>
          <span className="text-white">|</span>
          <Link to='/table'>
            <AIcon.AiOutlineTable className="text-[#F44C57] text-[35px] cursor-pointer hover:text-[#F44C57]" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden bg-gray-200 space-y-[70px]">
        <div className="flex flex-col items-center space-y-5">
          <span className="font-extrabold text-[45px] text-[#0E054D]">Table Data</span>
          <span className="font-normal text-[18px] text-gray-500">You can read all contact us message.</span>
        </div>
        <div className="p-2 space-x-2 flex w-[1100px] h-[570px] rounded-3xl shadow-white bg-white overflow-x-auto">
          <table className="w-full h-fit text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs h-[60px] text-gray-700 uppercase border-b border-gray-300">
              <tr>
                <th scope="col" className="py-3 px-6 border-r">
                    Fullname
                </th>
                <th scope="col" className="py-3 px-6 border-r">
                    Email
                </th>
                <th scope="col" className="py-3 px-6 border-r">
                    Phone
                </th>
                <th scope="col" className="py-3 px-6 border-r">
                    Needed
                </th>
                <th scope="col" className="py-3 px-6">
                    Message
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.length && data.map((e, i)=>{
                  return(
                    <tr key={i} className="bg-white h-[50px] border-b border-gray-300">
                      <td className="py-4 px-6 text-gray-900 border-r">
                        {e.first_name} {e.last_name}
                      </td>
                      <td className="py-4 px-6 text-gray-900 border-r">
                        {e.email}
                      </td>
                      <td className="py-4 px-6 text-gray-900 border-r">
                        {e.phone}
                      </td>
                      <td className="py-4 px-6 text-gray-900 border-r">
                        {e.needed === "1"? "Web Design":e.needed === "2"? "Web Development":e.needed === "3"? "Logo Design":"Other"}
                      </td>
                      <td className="py-4 px-6 text-gray-900 w-[400px]">
                        {e.message}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}