import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import useGeneralStore from './useGeneralStore';

function Stats() {
  let ref = useRef([])
  let [type, setType] = useState([]);
  let show=useGeneralStore(state=> state.data.show)

  let { data, isLoading, error, refetch } = useQuery(
    ['Category', type],
    async ({ queryKey }) => {
      let get = await fetch('http://localhost:4700/category')
      let conv = await get.json()
      return conv
    },
    {
      onSuccess: (x) => {},
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )

  const stats_fnx = (e) => {
    setType((x) => (!x.includes(e) ? [...x, e] : x.filter((a) => a !== e)))
  }

  return (
    <div className={`bg-black  ${show? "-translate-x-60":"-translate-x-500"} ${show? "opacity-100":"opacity-0"} ${show? "-z-1":"z-0"}  overflow-hidden  transition-all duration-1000  flex justify-between rounded-lg absolute top-20 z-10 w-1/2 border-1 border-gray-600  p-4 space-x-4`}>
      {/* Ratings Section */}
      <div className="flex flex-col justify-start items-center w-1/2 space-y-4">
        <button
          value="Ratings"
          className="font-black px-4 py-2 bg-red-900 text-white rounded-lg shadow-md hover:bg-red-800 transition"
          onClick={(e) => stats_fnx(e.target.value)}
        >
          Ratings
        </button>

        <ul
          ref={(e) => (ref.current[0] = e)}
          className={`bg-black border-2 border-red-900 w-full flex flex-wrap gap-4 p-4 overflow-hidden transition-all duration-1000 ${
            type.includes('Ratings') ? 'h-[550px] opacity-100 visible' : 'h-0 opacity-0 invisible'
          }`}
        >
          {isLoading ? (
            <li className="text-white text-center w-full py-4">Loading...</li>
          ) : (
            data.overall.map((x, i) => (
              <div key={i} className="w-[45%] text-center">
                <h3 className="font-black text-red-900 text-lg mb-2">{x.title.name}</h3>
                <div className="text-gray-300 flex justify-center">
                  <li className="font-black text-white text-lg">{x.title.stars}</li>
                </div>
              </div>
            ))
          )}
        </ul>
      </div>

      {/* Category Section */}
      <div className="flex flex-col justify-start items-center w-1/2 space-y-4">
        <button
          value="Category"
          className="font-black px-4 py-2 bg-red-900 text-white rounded-lg shadow-md hover:bg-red-800 transition"
          onClick={(e) => stats_fnx(e.target.value)}
        >
          Category
        </button>

        <ul
          ref={(e) => (ref.current[1] = e)}
          className={`bg-black border-2 border-red-900 w-full flex flex-wrap gap-4 p-4 overflow-hidden transition-all duration-1000 ${
            type.includes('Category') ? 'h-[550px] opacity-100 visible' : 'h-0 opacity-0 invisible'
          }`}
        >
          {isLoading ? (
            <li className="text-white text-center w-full py-4">Loading...</li>
          ) : (
            data.genre_wise.map((x, i) => (
              <div key={i} className="w-[45%] text-center">
                <h3 className="font-black text-white text-lg mb-2">{x.title.genre}</h3>
                {x.title.name.map((y, j) => (
                  <div key={j} className="text-gray-300 flex justify-between">
                    <li className="font-black text-red-900">{y.name}</li>
                    <li className="text-white">{y.ratings}</li>
                  </div>
                ))}
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default Stats
