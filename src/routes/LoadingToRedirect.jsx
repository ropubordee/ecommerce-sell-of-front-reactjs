import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToRedirect = () => {

    const [count , setCount] = useState(10)
    const [redirect , setRedirect] = useState(false)
    
    useEffect(()=>{
        const interval = setInterval(()=>{

            setCount((currentCount)=>{
                if(currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })
        },1200)

        return ()=> clearInterval(interval)
        
    },[])

    if( redirect){
        return <Navigate to={'/'}/>
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-500 to-pink-100">
    <img src="https://media.istockphoto.com/id/1222806141/photo/computer-error.jpg?s=612x612&w=0&k=20&c=QqNEXgbPj31_dIabFdYxu61_H0XJCKc5S_2LO7Z_TeU=" alt="No Permission" className="w-36 h-36 mb-6 animate-bounce rounded-md" />
    <h1 className="text-4xl text-red-600 mb-4 animate-fadeIn">No Permission</h1>
    <p className="text-xl text-gray-600">
      Redirecting in <span id="countdown" className="font-semibold text-red-600">{count}</span> seconds...
    </p>
  </div>
  )
}

export default LoadingToRedirect
