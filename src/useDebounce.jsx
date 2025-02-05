import React, { useEffect, useState } from 'react'

function useDebounce(value,time) {
let [val,setVal]=useState(value);
useEffect(()=>{
    let x=setTimeout(() => {
        setVal(x=> x=value)
    }, 1000);
     return ()=>clearTimeout(x)

},[val,time])


  return val
}

export default useDebounce