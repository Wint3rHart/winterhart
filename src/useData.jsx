import React from 'react';
import { useQuery } from 'react-query';
import useGeneralStore from './useGeneralStore';

function useData(value, type, id) {
  console.log(value, type);

  let setSeatsData = useGeneralStore(state => state.fnx.setSeatsData);

  let query = useQuery(
    [type, value, id], 
    async ({ queryKey, signal }) => {  // Extract `signal`
      let url =
        type === 'movie'
          ? `http://localhost:4700/movies?type=${queryKey[1]}`
          : type === 'custom'
          ? `http://localhost:4700/movies?title=${queryKey[1]}&type=custom`
          : type === 'seats'
          ? `http://localhost:4700/seats/${value}?screen=${id}`
          : `http://localhost:4700/user/${queryKey[1]}`;

      let get = await fetch(url, { signal }); // Pass `signal`
      let conv = await get.json();

      return conv;
    },
    {
      onSuccess: (x) => {
        if (type === 'seats') {
          setSeatsData(id == 1 ? x[0].screenA.seats : x[0].screenB.seats);
        }
      },
      refetchOnWindowFocus: false,
      staleTime: type === 'movie' ? 900000 : undefined,
      cacheTime: 900000
    }
  );

  return query;
}

export default useData;
