import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import useSignStore from './useSignStore';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';


// const sign_Fnx=(state,action)=>{ ... }

function Sign() {
 

    let nav = useNavigate();
    let set_token = useSignStore(state => state.fnx.setToken);
    let set_error = useSignStore(state => state.fnx.setError);
    let [reg, setReg] = useState(true);
   let {register,handleSubmit,control,getValues,formState }=useForm({defaultValues:{name:'',email:'',password:'',age:[{age:null}]}})
let{errors,dirtyFields,isValid}=formState
let {fields,append,remove}=useFieldArray({name:'age',control})

    let { mutate, isLoading,error,isError } = useMutation(['register'], async (body) => {
        let send = await fetch(reg ? "http://localhost:4700/reg" : "http://localhost:4700/sign", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        let conv = await send.json();
        return conv;
    }, {
        onSuccess: (x) => {
            console.log(x);
            
            
            x.error ? set_error(x) : x.token ? set_token(x,status) : x.success ? set_error(x) : null;
        }
    });

    

console.log('re render');

    
  useEffect(()=>{console.log(dirtyFields,isValid,errors);
  },[dirtyFields,isValid,errors])
  

    return (
        <div className="bg-black text-white flex min-h-screen flex-col  items-center pt-16 sm:justify-center sm:pt-0">
            <a className='hover:scale-95 rounded-full border-1 border-red-700 transition-all duration-1000 hover:border-red-900' onClick={(e)=>{e.preventDefault();nav('/movies');}} href="/movies">
                <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                    </div>
                </div>
            </a>
            <div className="relative mt-12 w-full max-w-lg sm:mt-10">
                <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
                <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
                    <div className="flex flex-col p-6">
                        <h3 className="text-xl font-semibold leading-6 tracking-tighter">{reg?"Register":"Sign In"}</h3>
                        <p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.</p>
                    </div>
                    <div className="p-6 pt-0">
                        <form onSubmit={handleSubmit((data)=>{ ;mutate(data); })}>
                            <div>
                                <div>
                                    <div className="group relative rounded-lg border focus-within:border-red-900 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-red text-gray-400">Username</label>
                                            <div className="absolute right-3 translate-y-2 text-red-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input  type="text" name="username"  autoComplete="off"
                                            className=" focus-within:border-red-900 block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full focus-within:ring-red-300/30 file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none  transition duration-300 ease-in-out"  {...register("name",{required:"Cant remain empty",pattern:{value:/^[a-zA-Z\s]{1,50}$/
                                                ,message:"Invalid Name Format"},validate:(value)=>{ return value.length<6?"Must have atleast 8 characters":true   }})}   
                                             />
                                            <p>{errors.name?errors.name.message:null}</p>
                                            
                                    </div>
                                </div>
                            </div>



                            <div className="mt-4">
                                <div>
                                    <div className="group relative rounded-lg border focus-within:border-red-900 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input  type="Email" name="Email"
                                                className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none  transition duration-300 ease-in-out"      {...register("email",{required:'Cant be Empty',pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Invalid Email forat"}})}        />
                                                 <p>{errors.email?errors.email.message:null}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                           {reg&& <div className="mt-4">
                                <div>
                                    <div className="group relative rounded-lg border focus-within:border-red-900 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Age</label>
                                        </div>
                                       
                                            {fields.map((x,i)=>{return  <div key={x.id} className="flex justify-center items-center"> <input  type='number' min={1} {...register(`fields.${i}.age` ,{required:'Cant be Empty',validate:(value)=>{ return value<18?"Too young,Go Study":true }})} />
                                            <p>{errors.fields && errors.fields[i]?.age && errors.fields[i].age.message}</p></div>})}
                                                 
                                        
                                    </div>
                                </div>
                            </div>}



                            
                            <div className="mt-4">
                                <div>
                                    <div className="group relative rounded-lg border focus-within:border-red-900 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-red-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input  type="password" name="password"
                                                className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none transition duration-300 ease-in-out"   {...register("password",{required:"Cant be empty",validate:(value)=>{return value.length<8?"Must have 8 characters":true }})} />
                                                 <p>{errors.password?errors.password.message:null}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
<p>{isError?error:''}</p>
                            <div className="mt-4 flex items-center justify-end gap-x-2">
                            <button type='submit' className="bg-transparent hover:bg-black-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded">
  Submit
</button>
                            </div>
                        </form>
                        <DevTool control={control}/>
                        <a onClick={(e) => {e.preventDefault() ;setReg(true) }} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                            href="/register">Register</a>

                        <a onClick={(e) => {e.preventDefault() ;setReg(false) }} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                            href="/register">Sign In</a>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Sign;
