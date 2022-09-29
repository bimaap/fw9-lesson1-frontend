import React from "react";
import * as HIcon from "react-icons/hi";
import * as FIcon from "react-icons/fa";
import * as AIcon from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataById } from "../redax/asyncActions/contact-us";


export default function Table(){
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contactUs.data)
  const dataContact = useSelector((state) => state.contactUs.dataContact)
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [limit, setLimit] = React.useState(8);
  const [card, setCard] = React.useState({active: false})

  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [needed, setNeeded] = React.useState("1")
  const [message, setMessage] = React.useState("")

  React.useEffect(()=>{
    dispatch(getData({}))
  }, [dispatch])

  const controlPage = (value) => {
    setPage(value);
    dispatch(getData({page: value, search, limit}))
  }

  const controlSearch = (value) => {
    setSearch(value);
    dispatch(getData({page, search: value, limit}))
  }

  const controlLimit = (value) => {
    setLimit(value);
    dispatch(getData({page, search, limit: value}))
  }

  const controlCard = (value) => {
    setCard({id: value.id, active: value.active, title: value.title});
    dispatch(getDataById({id: value.id}))
  }

  const onClickSubmit = (e) => {
    e.preventDefault();

    console.log(firstName, lastName);
    // firstName && lastName && email && phone && needed && message?
    //   dispatch(createData({firstName, lastName, email, phone, needed, message}))
    //   : setMsgError("All data must be filled")
  }

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
      <div className="flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden bg-gray-200 space-y-[20px]">
        <div className="flex flex-col items-center space-y-2">
          <span className="font-extrabold text-[45px] text-[#0E054D]">Table Data</span>
          <span className="font-normal text-[18px] text-gray-500">You can read all contact us message.</span>
        </div>
        <span className="text-xs text-red-500 invisible">Error</span>
        <div className="p-2 flex flex-col justify-between w-[1100px] h-[570px] space-y-2 rounded-3xl shadow-white bg-white overflow-x-auto">
          <table className="w-full h-fit text-sm text-left border border-[#0E054D] rounded-t-3xl rounded-b-xl overflow-hidden bg-[#0E054D]">
            <thead className="text-xs h-[60px] text-white uppercase">
              <tr>
                <th scope="col" className="px-3 border-r">
                  #
                </th>
                <th scope="col" className="px-3 border-r">
                  Fullname
                </th>
                <th scope="col" className="px-3 border-r">
                  Needed
                </th>
                <th scope="col" className="px-3 border-r">
                  Message
                </th>
                <th scope="col" className="px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data?.results?.length ? data.results?.map((e, i)=>{
                  return(
                    <tr key={i} className="bg-white h-[25px] border-b border-[#0E054D]">
                      <td className="px-3 py-[11px] w-[30px] text-gray-900 border-r border-[#0E054D]">
                        {e.id}
                      </td>
                      <td className="px-3 py-[11px] max-w-[170px] text-gray-900 border-r border-[#0E054D]">
                        <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                          {e.first_name} {e.last_name}
                        </div>
                      </td>
                      <td className="px-3 py-[11px] w-[170px] text-gray-900 border-r border-[#0E054D]">
                        <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                          {e.needed === "1"? "Web Design":e.needed === "2"? "Web Development":e.needed === "3"? "Logo Design":"Other"}
                        </div>
                      </td>
                      <td className="px-3 py-[11px] max-w-[600px] text-gray-900 border-r border-[#0E054D]">
                        <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                          {e.message} 
                        </div>
                      </td>
                      <td className="px-3 py-[11px] flex justify-center space-x-2 text-gray-900">
                        <div className="w-[30px] h-[30px] bg-blue-300 flex justify-center items-center rounded-md cursor-pointer" onClick={()=>controlCard({id: e.id, active: true, title: 'Detail'})}><HIcon.HiEye className="text-[#0E054D]" /></div>
                        <div className="w-[30px] h-[30px] bg-green-300 flex justify-center items-center rounded-md cursor-pointer" onClick={()=>controlCard({id: e.id, active: true, title: 'Edit'})}><HIcon.HiPencilAlt className="text-[#0E054D]" /></div>
                        <div className="w-[30px] h-[30px] bg-red-300 flex justify-center items-center rounded-md cursor-pointer" onClick={()=>controlCard({id: e.id, active: true, title: 'Delete'})}><HIcon.HiTrash className="text-[#0E054D]" /></div>
                      </td>
                    </tr>
                  )
                })
                : null
              }
            </tbody>
          </table>
          {
            !data?.results?.length && 
              <div className="flex justify-center">
                Data not found!
              </div>
          }
          <div className="bg-[#0E054D] flex items-center justify-between px-10 h-[60px] rounded-b-3xl rounded-t-xl">
            <div className="space-x-2">
              <input type="text" placeholder="Search contact" className="px-1" onChange={(e)=>controlSearch(e.target.value)} />
              <select name="limit" defaultValue={8} onChange={(e) => controlLimit(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 h-fit">
              <div className={`w-fit px-3 h-[30px] ${data.pageInfo?.prevPage? 'bg-[#F44C57] text-[#0E054D]':'bg-gray-100 text-gray-300'} cursor-pointer flex justify-center items-center rounded-md`} onClick={() => data.pageInfo?.prevPage&&controlPage(data.pageInfo?.prevPage)}>Prev</div>
              <div className="w-[30px] h-[30px] bg-white text-[#0E054D] flex justify-center items-center rounded-md">{data.pageInfo?.currentPage}</div>
              <div className={`w-fit px-3 h-[30px] ${data.pageInfo?.nextPage? 'bg-[#F44C57] text-[#0E054D]':'bg-gray-100 text-gray-300'} cursor-pointer flex justify-center items-center rounded-md`} onClick={() => data.pageInfo?.nextPage&&controlPage(data.pageInfo?.nextPage)}>Next</div>
            </div>
          </div>
        </div>
      </div>
      {
        card.active &&
        <div className="absolute top-0 w-full h-full flex justify-center items-center bg-black/50">
          <div className="w-[400px] h-[500px] rounded-2xl p-5 bg-white flex flex-col">
            <div className="flex justify-between items-center border-b-[1px] pb-2">
              <span className="text-xl font-semibold">{card.title} Contact Us</span>
              <HIcon.HiX className="text-2xl cursor-pointer" onClick={() => controlCard({active: false})} />
            </div>
            <div className="pt-2 flex-1">
              {/* ID: {card.id} */}
              {
                <div className="flex flex-col h-full">
                  {
                    card.title === 'Detail' &&
                    <div className="space-y-2">
                      <div className="flex flex-col border px-2 py-1">
                        <span className="text-xs">Full Name</span>
                        <span className="font-semibold">
                          {dataContact?.first_name} {dataContact?.last_name}
                        </span>
                      </div>
                      <div className="flex flex-col border px-2 py-1">
                        <span className="text-xs">Email</span>
                        <span className="font-semibold">
                          {dataContact?.email}
                        </span>
                      </div>
                      <div className="flex flex-col border px-2 py-1">
                        <span className="text-xs">Phone</span>
                        <span className="font-semibold">
                          {dataContact?.phone}
                        </span>
                      </div>
                      <div className="flex flex-col border px-2 py-1 h-[190px]">
                        <span className="text-xs">Message for <span className="font-semibold">{dataContact?.needed === "1"? "Web Design":dataContact?.needed === "2"? "Web Development":dataContact?.needed === "3"? "Logo Design":"Other"}</span></span>
                        <span className="font-semibold overflow-x-auto">
                          {dataContact?.message}
                        </span>
                      </div>
                    </div>
                  }
                  {
                    card.title === 'Edit' &&
                    <form className="flex flex-col" onSubmit={onClickSubmit}>
                      <div className="flex flex-col mb-1">
                        <div className="flex space-x-2">
                          <div className="flex px-2 py-1 flex-col flex-1 border">
                            <span className="text-xs">First Name</span>
                            <input type="text" placeholder="Joe..." onChange={(text)=>setFirstName(text.target.value)} className="outline-none bg-slate-100 w-full" defaultValue="" />
                          </div>
                          <div className="flex px-2 py-1 flex-col flex-1 border">
                            <span className="text-xs">Last Name</span>
                            <input type="text" placeholder="Don..." onChange={(text)=>setLastName(text.target.value)} className="outline-none bg-slate-100 w-full" defaultValue="" />
                          </div>
                        </div>
                        <span className="text-xs text-red-500 invisible">Error</span>
                      </div>
                      <div className="flex flex-col mb-1">
                        <div className="flex flex-col border px-2 py-1">
                          <span className="text-xs">Email</span>
                          <input type="text" placeholder="example@mail.com" onChange={(text)=>setEmail(text.target.value)} className="outline-none bg-slate-100 w-full" defaultValue="" />
                        </div>
                        <span className="text-xs text-red-500 invisible">Error</span>
                      </div>
                      <div className="flex flex-col mb-1">
                        <div className="flex flex-col border px-2 py-1">
                          <span className="text-xs">Phone</span>
                          <input type="text" placeholder="0812637217232" onChange={(text)=>setPhone(text.target.value)} className="outline-none bg-slate-100 w-full" defaultValue="" />
                        </div>
                        <span className="text-xs text-red-500 invisible">Error</span>
                      </div>
                      <div className="flex flex-col border px-2 py-1 mb-2">
                        <span className="text-xs">What the of website do you need?</span>
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" className="w-4 h-4" name="needed" value={1} onChange={e => setNeeded(e.target.value)} checked={needed === "1"? true:false} />
                              <span className="text-sm">Web Design</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" className="w-4 h-4" name="needed" value={2} onChange={e => setNeeded(e.target.value)} checked={needed === "2"? true:false} />
                              <span className="text-sm">Web Development</span>
                            </div>
                          </div>
                          <div className="w-[150px]">
                            <div className="flex items-center space-x-2">
                              <input type="radio" className="w-4 h-4" name="needed" value={3} onChange={e => setNeeded(e.target.value)} checked={needed === "3"? true:false} />
                              <span className="text-sm">Logo Design</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" className="w-4 h-4" name="needed" value={4} onChange={e => setNeeded(e.target.value)} checked={needed === "4"? true:false} />
                              <span className="text-sm">Other</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col mb-1">
                        <div className="flex flex-col border px-2 py-1 h-[70px]">
                          <span className="text-xs">Message</span>
                          <textarea className="outline-none bg-slate-100 h-full" onChange={(text)=>setMessage(text.target.value)} placeholder="Write your message..." defaultValue="" />
                        </div>
                        <span className="text-xs text-red-500 invisible">Error</span>
                      </div>
                      <button type="submit" className="bg-[#0E054D] h-[48px] text-white rounded-lg">Edit</button>
                    </form>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}