import React, { useEffect } from 'react';
import useData from './useData';
import useSignStore from './useSignStore';
import { useNavigate, useParams } from 'react-router-dom';
import usePost from './usePost';
import { useQueryClient } from 'react-query';



function User() {
  let { user_id } = useParams();
  let decoded = decodeURIComponent(user_id);
  let nav = useNavigate();
  let { data, isLoading } = useData(decoded, "user");
  let { mutate } = usePost(decoded, "Delete");


  useEffect(() => {
    isLoading ? console.log('loading') : console.log(data);
  }, [data]);

  return (
    <>
      <span 
       className="group  transition-all duration-1000 relative bg-stone-900/50 mt-3 text-white-100 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-gray-200 rounded-xl z-1 cursor-pointer"
        onClick={() => { nav('/movies'); }}
      >
        Back
      </span>
      <div className="p-4">
        {isLoading ? (
          <h1 className="text-xl font-bold text-center">LOADING...</h1>
        ) : (
          <div>
            <ul className="list-none text-center">
              <li className="font-bold text-lg">{data.name.toUpperCase()}</li>
              <li>{data.email}</li>
              <li>{data._id}</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4">BOOKINGS</h3>
            <div className="flex flex-wrap justify-evenly text-center mt-4">
              {data.bookings.map((x, i) => (
                <ul key={i} className="list-none text-center border p-4 rounded-md shadow-md">
                  <li className="font-semibold">{x.movie.title}</li>
                  <li>{x.movie.genre}</li>
                  <li>{x.movie.rating}</li>
                  <li className="flex justify-center gap-2">
                    <span>{x.movie.showtimes[0].time}</span>
                    <span>{x.movie.showtimes[0].date}</span>
                  </li>
                  <img 
                    src={`/${x.movie.path}`} 
                    className="h-72 w-72    object-fit mx-auto mt-2 rounded-lg"
                    alt={x.movie.title}
                  />
                  <div className="border-2 border-red-500 p-4 mt-2 max-w-[300px] flex flex-col justify-center items-center rounded-md">
                    <h3 className="text-red-500 font-semibold mb-2">Seats</h3>
                    <div className="flex justify-between  gap-2">
                <div>     { x.screen.screenA.length>0&& <div ><h3>Screen A</h3>{x.screen.screenA.map((y, j) => (
                        <div className='flex justify-center'>
                        <span key={j} className="bg-red-500   text-white py-1 px-3 mt-1 mb-1 rounded-md text-sm">{y.name}</span></div>
                        
                      )) }</div>           
                    } </div> 

<div>{x.screen.screenB&&<div><h3>Screen B</h3>  {x.screen.screenB.map((y,j)=>{return <div className='flex justify-center '> 
  <span key={j} className="bg-red-500 text-white py-1 px-3 mt-1 mb-1 rounded-md text-sm">{y.name}</span></div>  })} </div>  }</div>

                    </div>
                  </div>
                  <button 
                    className="group  transition-all duration-1000 relative bg-stone-900/50 mt-3 text-white-100 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-gray-200 rounded-xl z-1"
                    onClick={() => { mutate({ seatA: x.screen.screenA,seatB:x.screen.screenB, user_id: decoded, movie_id: x.movie._id }); }}
                  >
                    Delete
                  </button>
                </ul>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default User;
