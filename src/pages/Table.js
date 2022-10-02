import React from "react";
import * as HIcon from "react-icons/hi";
import * as AIcon from "react-icons/ai";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataById, updateData, deleteData } from "../redax/asyncActions/contact-us";
import { Formik } from "formik";
import * as Yup from 'yup'


export default function Table(){
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contactUs.data)
  const dataContact = useSelector((state) => state.contactUs.dataContact)
  const msgSuccess = useSelector((state) => state.contactUs.message)
  const [msg, setMsg] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [limit, setLimit] = React.useState(8);
  const [sort, setSort] = React.useState('asc');
  const [card, setCard] = React.useState({active: false})

  // const [firstName, setFirstName] = React.useState("")
  // const [lastName, setLastName] = React.useState("")
  // const [email, setEmail] = React.useState("")
  // const [phone, setPhone] = React.useState("")
  const [needed, setNeeded] = React.useState("1")
  // const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  React.useEffect(()=>{
    dispatch(getData({}))

    if(msg){
      setTimeout(()=>{
        setMsg(false)
      }, 4000);
    }
  }, [dispatch, msg])

  const controlPage = (value) => {
    setPage(value);
    dispatch(getData({page: value, search, limit, sort}))
  }

  const controlSearch = (value) => {
    setSearch(value);
    dispatch(getData({page: 1, search: value, limit: 8, sort: 'asc'}))
  }

  const controlLimit = (value) => {
    setLimit(value);
    dispatch(getData({page, search, limit: value, sort}))
  }

  const controlSort = (value) => {
    setSort(value);
    dispatch(getData({page, search, limit, sort: value}))
  }

  const controlCard = (value) => {
    setCard({id: value.id, active: value.active, title: value.title});
    if(value.id){
      setNeeded(value.needed)
      dispatch(getDataById({id: value.id}))
    }
  }

  // const onEditContact = (e, id) => {
  //   e.preventDefault();
    
  //   e.target[0].value && e.target[1].value && e.target[2].value && e.target[3].value && needed && e.target[8].value &&
  //     dispatch(updateData({
  //       firstName: e.target[0].value, 
  //       lastName: e.target[1].value, 
  //       email: e.target[2].value, 
  //       phone: e.target[3].value, 
  //       needed, 
  //       message: e.target[8].value, 
  //       id
  //     }))
    
  //   setLoading(true)
  //   setTimeout(()=>{
  //     controlCard({active: false})
  //     dispatch(getData({}))
  //     setLoading(false)
  //   }, 2000);
  // }

  const onDeleteContact = (id) => {
    setLoading(true)
    dispatch(deleteData({id}))

    setTimeout(()=>{
      setMsg(true)
      controlCard({active: false})
      dispatch(getData({}))
      setLoading(false)
    }, 2000);
  }

  const editSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'), 
    last_name: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
  })

  const onEdit = (props) => {
    if(Object.keys(props.errors).length){
      return;
    }

    const data = {
      id: dataContact?.id,
      firstName: props.values.first_name? props.values.first_name:dataContact?.first_name, 
      lastName: props.values.last_name? props.values.last_name:dataContact?.last_name,
      email: props.values.email? props.values.email:dataContact?.email,
      phone: props.values.phone? props.values.phone:dataContact?.phone,
      needed: needed,
      message: props.values.message? props.values.message:dataContact?.message,
    }

    setLoading(true)
    dispatch(updateData(data))
    setTimeout(()=>{
      setMsg(true)
      controlCard({active: false})
      dispatch(getData({}))
      setLoading(false)
    }, 2000);
  };

  // console.log(data.pageInfo.totalData);

  return(
    <div className="bg-gray-200 md:h-[100vh]">
      <div className="h-[50px] flex items-center justify-center rounded-b-xl bg-[#0E054D] w-full px-5">
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
      <div className="flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden bg-gray-200 space-y-2 p-5">
        <div className="flex flex-col items-center space-y-2">
          <span className="font-extrabold text-[45px] text-[#0E054D] text-center">Table Data</span>
          <span className="font-normal text-[18px] text-gray-500 text-center">You can read all contact us message.</span>
        </div>
        {
          msgSuccess && msg &&
          <div className="flex justify-center items-center space-x-1">
            <div className="flex justify-center items-center rounded-full w-5 h-5 bg-green-600">
              <HIcon.HiCheck className="text-white" />
            </div>
            <span className="text-green-600">{msgSuccess}</span>
          </div>
        }
        <div className="bg-[#0E054D] flex items-center justify-between w-full max-w-[1100px] p-4 rounded-t-3xl rounded-b-xl space-y-2">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input type="text" placeholder="Search contact" className="px-1" onChange={(e)=>controlSearch(e.target.value)} />
            <div className="space-x-2">
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
              <select name="limit" defaultValue={'asc'} onChange={(e) => controlSort(e.target.value)}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-2 flex flex-col justify-between w-full max-w-[1100px] space-y-2 rounded-3xl shadow-white bg-white overflow-auto">
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
                        {search? i+1 : sort === 'asc'? (i+1 + (page - 1) * limit):((parseInt(data.pageInfo.totalData)-i) - (page - 1) * limit)}
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
                        <div className="w-[30px] h-[30px] bg-blue-300 flex justify-center items-center rounded-md cursor-pointer" onClick={()=>controlCard({id: e.id, active: true, title: 'Detail', needed: e.needed})}><HIcon.HiEye className="text-[#0E054D]" /></div>
                        <div className="w-[30px] h-[30px] bg-green-300 flex justify-center items-center rounded-md cursor-pointer" onClick={()=>controlCard({id: e.id, active: true, title: 'Edit', needed: e.needed})}><HIcon.HiPencilAlt className="text-[#0E054D]" /></div>
                        <div className="w-[30px] h-[30px] bg-red-300 flex justify-center items-center rounded-md cursor-pointer" onClick={()=>controlCard({id: e.id, active: true, title: 'Delete', needed: e.needed})}><HIcon.HiTrash className="text-[#0E054D]" /></div>
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
        </div>
        <div className="bg-[#0E054D] flex items-center justify-center w-full max-w-[1100px] p-4 rounded-b-3xl rounded-t-xl space-y-2 flex-col sm:flex-row sm:h-[60px]">
          <div className="flex items-center space-x-2 h-fit">
            <div className={`w-fit px-3 h-[30px] ${data.pageInfo?.prevPage? 'bg-[#F44C57] text-[#0E054D]':'bg-gray-100 text-gray-300'} cursor-pointer flex justify-center items-center rounded-md`} onClick={() => data.pageInfo?.prevPage&&controlPage(data.pageInfo?.prevPage)}>Prev</div>
            <div className="w-[30px] h-[30px] bg-white text-[#0E054D] flex justify-center items-center rounded-md">{data.pageInfo?.currentPage}</div>
            <div className={`w-fit px-3 h-[30px] ${data.pageInfo?.nextPage? 'bg-[#F44C57] text-[#0E054D]':'bg-gray-100 text-gray-300'} cursor-pointer flex justify-center items-center rounded-md`} onClick={() => data.pageInfo?.nextPage&&controlPage(data.pageInfo?.nextPage)}>Next</div>
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
                      <div className="flex flex-col border px-2 py-1 h-[240px]">
                        <span className="text-xs">Message for <span className="font-semibold">{dataContact?.needed === "1"? "Web Design":dataContact?.needed === "2"? "Web Development":dataContact?.needed === "3"? "Logo Design":"Other"}</span></span>
                        <span className="font-semibold overflow-x-auto">
                          {dataContact?.message}
                        </span>
                      </div>
                    </div>
                  }
                  {
                    card.title === 'Edit' &&
                    <Formik
                      initialValues={{
                        first_name: '', 
                        last_name: '',
                        email: '',
                        phone: '',
                        message: '',
                      }}
                      validationSchema={editSchema}>
                      {(props) =>
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex flex-col mb-1">
                            <div className="flex space-x-2">
                              <div className="flex px-2 py-1 flex-col flex-1 border">
                                <span className="text-xs">First Name</span>
                                <input type="text" placeholder="Joe..." name="first_name" onChange={props.handleChange} className="outline-none bg-slate-100 w-full" defaultValue={dataContact?.first_name} />
                              </div>
                              <div className="flex px-2 py-1 flex-col flex-1 border">
                                <span className="text-xs">Last Name</span>
                                <input type="text" placeholder="Don..." name="last_name" onChange={props.handleChange} className="outline-none bg-slate-100 w-full" defaultValue={dataContact?.last_name} />
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <span className="text-xs text-red-500 flex-1">{props.errors?.first_name}</span>
                              <span className="text-xs text-red-500 flex-1">{props.errors?.last_name}</span>
                            </div>
                          </div>
                          <div className="flex flex-col mb-1">
                            <div className="flex flex-col border px-2 py-1">
                              <span className="text-xs">Email</span>
                              <input type="text" placeholder="example@mail.com" name="email" onChange={props.handleChange} className="outline-none bg-slate-100 w-full" defaultValue={dataContact?.email} />
                            </div>
                            <span className="text-xs text-red-500">{props.errors?.email}</span>
                          </div>
                          <div className="flex flex-col mb-1">
                            <div className="flex flex-col border px-2 py-1">
                              <span className="text-xs">Phone</span>
                              <input type="text" placeholder="0812637217232" name="phone" onChange={props.handleChange} className="outline-none bg-slate-100 w-full" defaultValue={dataContact?.phone} />
                            </div>
                            <span className="text-xs text-red-500">{props.errors?.phone}</span>
                          </div>
                          <div className="flex flex-col border px-2 py-1 mb-2">
                            <span className="text-xs">What the of website do you need?</span>
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <input type="radio" className="w-4 h-4" name="needed" onChange={e => setNeeded(e.target.value)} value={1} checked={needed === "1"? true:false} />
                                  <span className="text-sm">Web Design</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="radio" className="w-4 h-4" name="needed" onChange={e => setNeeded(e.target.value)} value={2} checked={needed === "2"? true:false} />
                                  <span className="text-sm">Web Development</span>
                                </div>
                              </div>
                              <div className="w-[150px]">
                                <div className="flex items-center space-x-2">
                                  <input type="radio" className="w-4 h-4" name="needed" onChange={e => setNeeded(e.target.value)} value={3} checked={needed === "3"? true:false} />
                                  <span className="text-sm">Logo Design</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="radio" className="w-4 h-4" name="needed" onChange={e => setNeeded(e.target.value)} value={4} checked={needed === "4"? true:false} />
                                  <span className="text-sm">Other</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col mb-1">
                            <div className="flex flex-col border px-2 py-1 h-[70px]">
                              <span className="text-xs">Message</span>
                              <textarea className="outline-none bg-slate-100 h-full" onChange={props.handleChange} name="message" placeholder="Write your message..." defaultValue={dataContact?.message} />
                            </div>
                            <span className="text-xs text-red-500">{props.errors?.message}</span>
                          </div>
                          <button onClick={() => onEdit(props)} className="flex items-center justify-center space-x-2 bg-[#0E054D] h-[48px] rounded-lg text-white font-semibold">
                            {loading&&<AIcon.AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white" />} 
                            <span>Edit</span>
                          </button>
                        </div>
                      }
                    </Formik>
                  }
                  {
                    card.title === 'Delete' &&
                    <div className="h-full flex items-center flex-col justify-center">
                      <div className="flex flex-1 items-center flex-col justify-center space-y-7">
                        <HIcon.HiExclamationCircle className="text-[65px] text-red-500" />
                        <span className="text-2xl font-bold">Are you sure?</span>
                        <span className="text-center">Do you want to delete these contact records? This process cannot be undone after confimation delete.</span>
                      </div>
                      <div className="flex w-full space-x-2">
                        <button onClick={() => controlCard({active: false})} type="submit" className="flex flex-1 items-center justify-center space-x-2 bg-gray-300 h-[48px] rounded-lg text-black font-semibold">
                          <span>Cancel</span>
                        </button>
                        <button onClick={() => onDeleteContact(card.id)} type="submit" className="flex flex-1 items-center justify-center space-x-2 bg-red-500 h-[48px] rounded-lg text-white font-semibold">
                          {loading&&<AIcon.AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white" />} 
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}