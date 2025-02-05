import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import useDetails from './useDetails';

function Details() {
  let [searchQuery, setSearch] = useSearchParams();
  let nav = useNavigate();
  let { data, isLoading } = useDetails(searchQuery.get('key'), searchQuery.get('url'));

  useEffect(() => {
    console.log('from child', data);
  }, [data]);

  return (
    <div className="h-[700px] hover:bg-gray-900/20  sm:w-[900px] mx-auto mt-10 flex transition-all duration-500 cursor-pointer border-5 border-red-900/50 rounded-lg hover:border-2 hover:border-gray-600 justify-center hover:scale-99 items-center">
      <div>
        <button 
          className="group  transition-all duration-1000 relative bg-stone-900/50  text-white-100 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-gray-200 rounded-xl z-1"
          onClick={() => nav('/movies')}
        >
          Close
        </button>
        <div className="flex justify-center items-center">
          {isLoading ? (
            'Getting'
          ) : (
            <div className="list-none mt-5">
             <img className="  sm:h-[450px] sm:w-[400px] sm:object-fit rounded-md border-4 border-red-900/50" src={`/${data.path}`} alt={data.title} /> <ul className='mt-10 font-bold text-base '>
              <li className="list">{`Name : ${data.title}`}</li>
              <li className="list">{`Genre : ${data.genre}`}</li>
              <li className="list">{`Ratings : ${data.rating}`}</li>
              <li className="list">{`Duration : ${data.duration}`}</li>
              <li className="list">
                <span>{data.showtimes[0].time}</span> -- <span>{data.showtimes[0].date}</span>
              </li></ul>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Details;
