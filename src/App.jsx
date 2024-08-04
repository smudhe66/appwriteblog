import { useEffect, useState, } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import conf from './conf/conf'

import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL)
  // console.log(import.meta.env.VITE_APPWRITE_URL1)

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=>setLoading(false))
  },[])

  console.log(conf.appWriteUrl)

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
