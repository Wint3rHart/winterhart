import React from 'react'
import { useQuery } from 'react-query'
import useDebounce from './useDebounce'

export default function useSearch(value) {

let debounced=useDebounce(value,1000);

let query=useQuery(["movies",debounced],async(debounced)=>{console.log(debounced);
;let get=await fetch(`http://localhost:4700/movies?title=${debounced.queryKey[1]}&type=custom`);let conv=await get.json();return conv},{onSuccess:(data)=>{console.log(data);
},enabled:false})



  return query
}
