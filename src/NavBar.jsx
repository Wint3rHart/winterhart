import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGeneralStore from './useGeneralStore';
import { shallow } from 'zustand/shallow';
import useSignStore from './useSignStore';
import useSearch from './useSearch';
import gsap from 'gsap';
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function NavBar() {
  let nav = useNavigate();

  console.log('nav rendered');

 
  let setValue = useGeneralStore(state => state.fnx.setGetValue);
  let show=useGeneralStore(state=> state.fnx.setShow);
  let logged_id = useSignStore(state => state.fields.logged_id);
  let status_fnx = useSignStore(state => state.fnx.setToken);
  let status = useSignStore(state => state.fields.status);
  let value=useGeneralStore(state=>state.data.getValue)
let search=useSearch(value)

let ref=useRef([]);

useEffect(()=>{ console.log(document.querySelectorAll(".animate"));
;gsap.from('.animate',{y:-100,duration:1,stagger:.2})
},[])

const search_fnx=(x)=>{

    setValue({category:x.length>0?x:'All',type:x.length>0?"custom":"movie"})


}



 
  useEffect(() => {
    useGeneralStore.subscribe(
      (state) => state.data.getValue,
      (selected) => {
        console.log(selected);
      }
    );
  }, []);

  return (
    <div className=" text-xs rounded-sm font-sans border-b border-t  hover:bg-red-800/50 transition-all duration-500 cursor-pointer  border-red-900/50 bg-red-800/25  hover:border-gray-400 sm:w-full flex sm:text-xl justify-evenly items-center py-2 -mt-8 relative   ">
     <span className="animate  cursor-pointer hover:scale-105 " onClick={()=>{show()}}>Stats</span>   
      <span  className="animate  cursor-pointer hover:scale-105 " onClick={() => nav('/movies')}>Home</span>
      <span  className="animate   cursor-pointer hover:scale-105 " onClick={() => nav('/register')}>Sign In/Up</span>
     <div  className='animate group mt-4 h-10  '><span className=' z-10' >
        {status ? <span className="font-bold">{status.toUpperCase()}</span> : "Not Logged In"}
      </span>
      <ul className={` animate bg-black  mt-5 -translate-y-17 group-hover:translate-y-0  group-hover:opacity-100 group-hover:h-10  flex   opacity-0 h-0  border border-red-500 absolute  list-none items-center transition-all duration-500 transform} `}>
        <li className={` animate w-24 mx-auto cursor-pointer mt-2 z-1 text-base`} onClick={() => nav(`/user/${encodeURIComponent(logged_id)}`)}>View Profile</li>
        <li className={` animate w-24 mx-auto cursor-pointer mt-1  z-1 text-base`} onClick={() => status_fnx(false)}>Sign Out</li>
      </ul></div> 
      <select  className={`animate border p-1 border-2 border-red-500/50 rounded-lg`}  onChange={(e) => setValue({category:e.target.value,type:"movie"})}>
        <option   className='bg-black text-red'>All</option>
        <option   className='bg-black    text-red'>Action</option>
        <option   className='bg-black    text-red'>Drama</option>
        <option   className='bg-black  text-red'>Comedy</option>
        <option   className='bg-black    text-red'>Horror</option>
        <option   className='bg-black    text-red'>Animation</option>
        <option   className='bg-black    text-red'>Sci-Fi</option>
      </select>
      <input className='border-1 border-white  focus:bg-gray-900/85 rounded-lg' onChange={(e)=>{ search_fnx(e.target.value)  }} type='search'/>
    </div>
  );
}

export default React.memo(NavBar);

