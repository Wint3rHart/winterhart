import React from 'react'
import { useQuery } from 'react-query'



function useSeats() {

    let query=useQuery(["seat"],async()=>{ let get=await fetch(`http://localhost:4700/movies?type=${value}`)})
  return (

    <div>              </div>
  )
}
export default useSeats