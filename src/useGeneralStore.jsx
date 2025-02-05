import React from "react";
import { data } from "react-router-dom";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useGeneralStore = create(subscribeWithSelector(immer( (set, get) => {
    return {
        data: {
            getValue:{category: 'All',type:"movie"},
            seats_data: [],index:[]
        },
        fnx: {
            setGetValue: (x) => {
                console.log('setting');
                ; set((state) => { return { ...state, data: { ...state.data, getValue:{...state.data.getValue,category:x.category,type:x.type,signal:x.signal} } } })
            },
        
            setSeatsData: (x) => { console.log(x);
            
                ; set((state) => { state.data.seats_data=x

                    
                 })
                 
            },
            book_seats:(i,j)=>{ set((state)=>{ state.data.seats_data[i][j].availability=false;
                state.data.index.push([i,j])     }) },
            
            reset_fnx:(refetch)=>{set((state)=>{ state.data.index=[];refetch() })},

            reset_index:()=>{set((state)=>{ state.data.index=[] })}
        },

    }




}),))

export default useGeneralStore