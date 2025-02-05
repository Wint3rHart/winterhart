import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useSignStore from './useSignStore';

function usePost(key,type) {

let client=useQueryClient()
let token=useSignStore(state=>state.fields.token)

let query=useMutation(async(body)=>{let send=await fetch('http://localhost:4700/book',{method:type==="Post"?'PUT':"Delete",headers:{'Content-Type':'application/json',"authorization":token},body:JSON.stringify(body)});let conv=await send.json();return conv   },{onSuccess:(x)=>{

;client.invalidateQueries('user')}})


  return query
}

export default usePost