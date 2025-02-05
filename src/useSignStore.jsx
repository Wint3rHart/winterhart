import React from "react";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useSignStore = create(
  persist(
    subscribeWithSelector(
      immer((set, get) => ({
        
        user_info:{name:null},
        fields: {
          token: null,
          status: false,logged_id:null,
          error: null,
        },
        fnx: {
         
         
          setToken: (x) => {
            set((state) => {
          if (x) {
            state.fields.token = x.token;
            state.fields.status = x.status;
            state.fields.logged_id=x.id;
          }   else{ state.fields.status = false;state.fields.logged_id=null}
            });
          },
          setError: (x) => {
            set((state) => {
              state.fields.error = x;
            });
          },
        },
      }))
    ),
    {
      name: 'key', // Name of the storage key,
      partialize:(state)=>{ return {fields:state.fields}  }
      
    }
  )
);

export default useSignStore;
