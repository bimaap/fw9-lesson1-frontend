import React from "react";
import * as HIcon from "react-icons/hi";
import * as FIcon from "react-icons/fa";
import * as AIcon from "react-icons/ai";
import { getData, createData } from "../redax/asyncActions/contact-us";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { cleanAction } from "../redax/reducers/contact-us";

export default function Contact(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.contactUs.success)
  const msgSuccess = useSelector((state) => state.contactUs.message)
  const [msgError, setMsgError] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [needed, setNeeded] = React.useState("1")
  const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const onClickSubmit = (e) => {
    e.preventDefault();
    firstName && lastName && email && phone && needed && message?
      dispatch(createData({firstName, lastName, email, phone, needed, message}))
      : setMsgError("All data must be filled")
  }

  React.useEffect(()=>{
    if(success){
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setNeeded("1")
        setMessage("")
        setTimeout(()=>{
          dispatch(cleanAction())
          setMsgError("")
        }, 2000);
      }, 2000);
    }

    msgError&&
    setTimeout(()=>{
      setMsgError("")
    }, 2000);
  }, [success, msgError])

  return(
    <>
      <div className="absolute h-[50px] flex items-center justify-center rounded-b-xl bg-[#0E054D] w-full">
        <div className="w-[1100px] flex items-center space-x-5">
          <Link to='/'>
            <AIcon.AiFillContacts className="text-[#F44C57] text-[35px] cursor-pointer hover:text-[#F44C57]" />
          </Link>
          <span className="text-white">|</span>
          <Link to='/table'>
            <AIcon.AiOutlineTable className="text-white text-[35px] cursor-pointer hover:text-[#F44C57]" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden bg-gray-200 space-y-[70px]">
        <div className="flex flex-col items-center space-y-5">
          <span className="font-extrabold text-[45px] text-[#0E054D]">Contact Us</span>
          <span className="font-normal text-[18px] text-gray-500">Any question or remarks? Just write us a message!</span>
        </div>
        <div className="p-2 space-x-2 flex w-[1100px] h-[570px] rounded-3xl shadow-white bg-white">
          <div className="relative flex justify-between flex-col bg-[#0E054D] p-10 rounded-2xl flex-[5.5] overflow-hidden">
            <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#F44C57]" />
            <div className="absolute bottom-[70px] right-[70px] w-[120px] h-[120px] rounded-full bg-[#9275D7]/80" />
            <div className="flex flex-col space-y-[65px]">
              <div className="flex flex-col space-y-3">
                <span className="text-white text-[24px] font-medium">Contact Information</span>
                <span className="text-gray-400 text-[15px] font-normal">Fill up the form and our Team will get back to you within 24 hours.</span>
              </div>
              <div className="space-y-10">
                <div className="flex items-center space-x-4 font-normal">
                  <HIcon.HiPhone className="text-[#F44C57] text-[20px]"/>
                  <span className="text-gray-300 text-[15px]">+62 8151 5157 971</span>
                </div>
                <div className="flex items-center space-x-4 font-normal">
                  <HIcon.HiMail className="text-[#F44C57] text-[20px]"/>
                  <span className="text-gray-300 text-[15px]">bima.armedianto@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 font-normal">
                  <HIcon.HiLocationMarker className="text-[#F44C57] text-[20px]"/>
                  <span className="text-gray-300 text-[15px]">Malang, Jawa Timur, Indonesia</span>
                </div>
              </div>
            </div>
            <div className="text-white flex text-[12px] space-x-2">
              <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#F44C57]">
                <FIcon.FaFacebookF />
              </div>
              <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#F44C57]">
                <FIcon.FaTwitter />
              </div>
              <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#F44C57]">
                <FIcon.FaInstagram />
              </div>
              <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#F44C57]">
                <FIcon.FaLinkedinIn />
              </div>
            </div>
          </div>
          <form onSubmit={onClickSubmit} className="flex-[10] p-10 flex-col flex justify-between">
            <div className="flex flex-col space-y-10">
              <div className="flex space-x-8">
                <div className="flex flex-col flex-1 space-y-1">
                  <span className={`text-[13px] ${firstName? 'text-[#472ECD]':'text-gray-500'} font-semibold`}>First Name</span>
                  <input type="text" spellCheck="false" placeholder="John" value={firstName} onChange={(text)=>setFirstName(text.target.value)} className={`outline- outline-none border-b-2 ${firstName? 'border-[#472ECD]':'border-gray-300'} font-semibold focus:border-[#472ECD]`}/>
                </div>
                <div className="flex flex-col flex-1 space-y-1">
                  <span className={`text-[13px] ${lastName? 'text-[#472ECD]':'text-gray-500'} font-semibold`}>Last Name</span>
                  <input type="text" spellCheck="false" placeholder="Doe" value={lastName} onChange={(text)=>setLastName(text.target.value)} className={`outline-none border-b-2 ${lastName? 'border-[#472ECD]':'border-gray-300'} font-semibold focus:border-[#472ECD]`}/>
                </div>
              </div>
              <div className="flex space-x-8">
                <div className="flex flex-col flex-1 space-y-1">
                  <span className={`text-[13px] ${email? 'text-[#472ECD]':'text-gray-500'} font-semibold`}>Mail</span>
                  <input type="text" spellCheck="false" placeholder="example@mail.com" value={email} onChange={(text)=>setEmail(text.target.value)} className={`outline-none border-b-2 ${email? 'border-[#472ECD]':'border-gray-300'} font-semibold focus:border-[#472ECD]`}/>
                </div>
                <div className="flex flex-col flex-1 space-y-1">
                  <span className={`text-[13px] ${phone? 'text-[#472ECD]':'text-gray-500'} font-semibold`}>Phone</span>
                  <input type="text" spellCheck="false" placeholder="+62 8123 4567 890" value={phone} onChange={(text)=>setPhone(text.target.value)} className={`outline-none border-b-2 ${phone? 'border-[#472ECD]':'border-gray-300'} font-semibold focus:border-[#472ECD]`}/>
                </div>
              </div>
              <div className="space-y-3">
                <span className="font-bold">What the of website do you need?</span>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="radio" className="w-5 h-5" name="needed" value={1} onChange={e => setNeeded(e.target.value)} checked={needed === "1"? true:false} />
                    <span className="text-sm">Web Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" className="w-5 h-5" name="needed" value={2} onChange={e => setNeeded(e.target.value)} checked={needed === "2"? true:false} />
                    <span className="text-sm">Web Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" className="w-5 h-5" name="needed" value={3} onChange={e => setNeeded(e.target.value)} checked={needed === "3"? true:false} />
                    <span className="text-sm">Logo Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" className="w-5 h-5" name="needed" value={4} onChange={e => setNeeded(e.target.value)} checked={needed === "4"? true:false} />
                    <span className="text-sm">Other</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 space-y-1">
                <span className={`text-[13px] ${message? 'text-[#472ECD]':'text-gray-500'} font-semibold`}>Message</span>
                <input type="text" spellCheck="false" placeholder="Write your message..." value={message} onChange={(text)=>setMessage(text.target.value)} className={`outline-none border-b-2 ${message? 'border-[#472ECD]':'border-gray-300'} font-semibold focus:border-[#472ECD]`}/>
              </div>
              {
                success && !loading &&
                <div className="flex justify-center items-center space-x-1">
                  <div className="flex justify-center items-center rounded-full w-5 h-5 bg-green-600">
                    <HIcon.HiCheck className="text-white" />
                  </div>
                  <span className="text-green-600">{msgSuccess}</span>
                </div>
              }
              {
                msgError &&
                <div className="flex justify-center items-center space-x-1">
                  <div className="flex justify-center items-center rounded-full w-5 h-5 bg-red-600">
                    <AIcon.AiOutlineExclamation className="text-white" />
                  </div>
                  <span className="text-red-600">{msgError}</span>
                </div>
              }
            </div>
            <div className="flex justify-end">
              <button type="submit" className="flex items-center space-x-2 bg-[#0E054D] px-8 py-4 rounded-lg text-white font-semibold">
                {loading&&<AIcon.AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white" />} 
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}