import React, { useEffect } from 'react';
import useData from './useData';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useGeneralStore from './useGeneralStore';
import usePost from './usePost';
import useSignStore from './useSignStore';
import { useQueryClient } from 'react-query';

function Seats() {
  let { id } = useParams();
  let [searchQuery,setSearchQuery]=useSearchParams();
  let decoded = decodeURIComponent(id);
  let nav = useNavigate();
let client=useQueryClient()

  let { isLoading, isError, error, refetch } = useData(decoded, "seats",searchQuery.get('screen'));

  let post = usePost(decoded, "Post");
  let seats_data = useGeneralStore((state) => state.data.seats_data);
  let select_seats = useGeneralStore((state) => state.fnx.book_seats);
  let index = useGeneralStore((state) => state.data.index);
  let reset_fnx = useGeneralStore((state) => state.fnx.reset_fnx);
  let user_id = useSignStore((state) => state.fields.logged_id);
  let reset_index = useGeneralStore((state) => state.fnx.reset_index);
  let status = useSignStore((state) => state.fields.status);

  console.log('Seats component re-rendered');
//FNX

useEffect(()=>{console.log(searchQuery.get("screen"),refetch());
;},[searchQuery])

const search_fnx=(x)=>{  setSearchQuery((y)=>{return {...y,screen:x}})  }





  useEffect(() => {
    useGeneralStore.subscribe(
      (state) => ({ index: state.data.index, seat: state.data.seats_data }),
      (x) => {
        console.log(x);
      }
    );
  }, []);

  return (
    <>
    <div className='relative w-full' >

<div className='absolute sm:top-50  sm:w-50 flex sm:justify-evenly w-50  sm:-translate-x-90'>

    <div className='  w-[150px] '>  
       <span className='rounded-full inline-block border-2 border-red-500  bg-red-500   w-[10px] h-[10px]'></span> <span className='text-white'>Booked</span>    </div>
<div className='w-[150px]'>
       <span className='rounded-full inline-block border-2 border-gray-500    w-[10px] h-[10px]'></span>
       <span className='text-white px-1'>Available</span>
</div>
</div>

    <div className="border-2 relative border-red-500  rounded-xl hover:bg-gray-900/20 cursor-pointer hover:scale-98 hover:border-gray-600/50 transition-all duration-1000  w-[540px] p-6 mx-auto">
  
   <div className='absolute top-10 ' onClick={(e)=>{search_fnx(e.target.value)}}> <button className="group  transition-all duration-1000 relative bg-stone-900/50  text-white-100 font-semibold hover:text-white py-1 px-3 border border-red-600 hover:border-gray-200 rounded-xl z-1" value="1" >Screen 1</button>  <button className="group  transition-all duration-1000 relative bg-stone-900/50  text-white-100 font-semibold hover:text-white py-1 px-3 border border-red-600 hover:border-gray-200 rounded-xl z-1" value='2' >Screen 2 </button>   </div>
      <button className="group  transition-all duration-1000 relative bg-stone-900/50  text-white-100 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-gray-200 rounded-xl z-1" onClick={() => nav('/movies')}>
        Back
      </button>
      {isLoading ? (
        <h1 className="text-center text-lg font-bold">LOADING</h1>
      ) : (
        seats_data.map((x, i) => (
          <div key={i} className="w-[500px] p-3">
            {x.map((y, j) => ( 
              <button
                key={j}
                disabled={!y.availability}
                className={`m-1 hover:scale-90 border-1 border-gray-900 transition-all duration-1000 overflow-hidden group relative px-4 py-2 rounded-full text-white ${y.availability ? 'bg-black' : 'bg-red-500'}`}
                onClick={() => {
                  console.log(y.availability);
                  select_seats(i, j);
                }}
              ><span className='border-2 border-red-900 bg-red-900/25 group-hover:translate-x-10 ease-in-out  group-hover:opacity-100 transition-all duration-1000 -translate-x-6 h-9 opacity-0 top-1 rounded-md absolute w-0 group-hover:w-8 inline-block group-hover:opacity-0'>  </span>
                {y.name}
              </button>  
            ))
            }
          </div>
        ))
      )
      }
      <div className="flex justify-evenly mt-4">
        <button
          className={` group hover:scale-95 transition-all duration-1000 relative   text-white-100 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded-xl z-1        ${status && index.length > 0 ? 'bg-red-900 hover:bg-red-900/25' : 'bg-transpaent cursor-not-allowed'}`}
          disabled={!(status && index.length > 0)}
          onClick={() => {
            post.mutate({ movie_id: decoded, seat_no: index, user_id: user_id ,screen:searchQuery.get("screen")});
            reset_index();
          }}
        >
          {status ? 'BOOK' : 'Sign In To Book'}
        </button>
        <button
          className={`group hover:scale-95 transition-all duration-1000 relative   text-white-100 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded-xl z-1 ${index.length > 0 ? 'bg-red-900 hover:bg-red-900/25' : 'bg-transpaent cursor-not-allowed'}`}
          disabled={index.length === 0}
          onClick={() => reset_fnx(refetch)}
        >
          RESET
        </button>
      </div>
    </div> </div></>
  );
}

export default Seats;
