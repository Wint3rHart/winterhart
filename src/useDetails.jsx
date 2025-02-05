import React from 'react'
import { useQuery } from 'react-query'

function useDetails(key,url) {

let query=useQuery([key,url],async()=>{let get=await fetch(key=='movies'?`http://localhost:4700/${url}`:key=='details'?`http://localhost:4700/details?id=${url}`:'');let conv=await get.json() ;return conv  },{onSuccess:(x)=>{console.log(x);
},staleTime:900000,cacheTime:900000,refetchOnWindowFocus:false})

  return query
}

export default useDetails