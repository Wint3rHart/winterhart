import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import MainRoutes from './MainRoutes'
import NavBar from './NavBar'


function App() {
 
let client=new QueryClient()
  return (
    <>
    <div >
<QueryClientProvider client={client}>
    
     <MainRoutes/>


      </QueryClientProvider>
   </div>
    </>
  )
}

export default App
