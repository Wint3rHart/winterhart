import React, { useEffect, useState } from 'react';
import useData from './useData';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import useGeneralStore from './useGeneralStore';

function Movies() {
  let value = useGeneralStore(state => state.data.getValue);

  let { data, isLoading } = useData(value.category, value.type);
  
  let [count, setCount] = useState(0);
  let nav = useNavigate();

  console.log('Movies component re-rendered');

  const next_fnx = (x) => {
    setCount(a => x === 'Next' ? (a + 1) % (data.length ) : (a > 1 ? a - 1 : data.length-1));
  };

  const book_fnx = (x) => {
    nav(`/movies/seats/${encodeURIComponent(x._id)}?screen=1`);
  };

  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <>
      <NavBar />
      <div className=" flex justify-start w-[300px] items-center sm:w-full sm:justify-center mt-12">
        
         
            <img  onClick={(e) => next_fnx('Prev')}   className='h-[50px] hover:scale-120 transition-all duration-500 cursor-pointer ' src='left-chevron (1).webp'/>
        
       

        <div className="  w-[400px]  sm:w-[1000px] overflow-hidden">
          <div className="flex justify-start w-[450px]  sm:w-[1000px]   " style={{ transform: `translateX(-${count * 50}%)`, transition: 'all 1s' }}>
            {isLoading ? 'Loading...' : data.map((x, i) => (
             <div key={i} className="w-1/2   text-center sm:w-1/2 flex-shrink-0 relative">
              <div className='group'>
             <img 
               src={`/${x.path}`} 
               className="h-[350px] w-full sm:w-[550px] sm:h-[600px] sm:border-2 group-hover:brightness-50 
                          border-red-900 rounded-lg group-hover:border-gray-300 transition-all duration-1000 
                          cursor-pointer sm:p-[15px_10px] group-hover:scale-95 peer"  
               alt={x.title}  
             />
             <h3 className="font-black text-2xl w-full group-hover:scale-110 transition-all duration-1000 
                            absolute opacity-0 group-hover:opacity-100 left-1/2 -translate-x-1/2 
                            text-center top-1/2">
               {x.title}
             </h3>
             <button
                  className="group z-1 transition-all duration-1000 relative -translate-y-20 opacity-0 group-hover:opacity-100   bg-stone-900/85  text-white-100 font-semibold hover:text-white py-2 px-4 border   border-transparent hover:outline-red-100 hover:border-gray-200 rounded-xl z-1"
                  onClick={() => nav(`/movies/details?key=details&url=${x._id}`)}
                > 
                
                  View Details
                </button>
</div>


            <div className='mt-1 flex justify-evenly'>    <button className="group border-1 border-red-600 transition-color duration-1000 relative bg-stone-900/50  text-white-100 font-semibold hover:text-white py-2 px-4 border hover:border-gray-100 rounded-xl z-1" onClick={() => book_fnx(x)}><span className=' w-1/2 absolute inline-block opacity-0 group-hover:opacity-200  top-0  h-full left-1/4  group-hover:scale-x-200 group-hover:bg-red-500/25 transition-all duration-1000 group-hover:rounded-lg z-0'></span>
                  Book Tickets
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <img className="h-[50px] cursor-pointer hover:scale-120 transition-all duration-500 "   src='chevron-right.webp'  onClick={(e) => next_fnx('Next')}/>
       


      </div>
      <Outlet />
    </>
  );
}

export default Movies;
