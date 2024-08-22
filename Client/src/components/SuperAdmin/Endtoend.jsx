import React from 'react'
import ServeMore from './ServeMore'
import ShareProft from './ShareProft'
import SmoothProcess from './SmoothProcess'
import OnlineFood from './OnlineFood'

export default function Endtoend() {
  return (
    <div>
    <div className='flex flex-col items-center mt-10 justify-center mb-5 lg:px-20 px-5 '>
        <div className="text-4xl font-medium mb-5  ">
        End-to-end Ordering System
        </div>
        <div className="w-24 h-[3px] bg-orange-500 mb-4"></div>

        </div> 
        <ServeMore/>
        <ShareProft/>
        <SmoothProcess/>
        <OnlineFood/>
    </div>
  )
}
