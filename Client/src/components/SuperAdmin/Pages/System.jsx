import React from 'react'
import SystemApp from '../SystemApp'
import SystemContact from '../SystemContact'
import Blog from '../Blog'

export default function System1() {
  return (
    <div>
        <SystemApp/>
        <SystemContact/>
        <div className="text-center mb-14">
  <p className='text-4xl font-bold'>Our Blog</p>
  <div className='mt-2 h-1 w-20 bg-orange-500 mx-auto'></div>
</div>
        <Blog/>
    </div>
  )
}
