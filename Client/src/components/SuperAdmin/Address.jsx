import React from 'react'
import { GrLocation } from "react-icons/gr";

export default function Address() {
    return (
        <>
        <div className='lg:px-24 md:px-20 sm:px-16 px-12 mt-10 mb-10'>

            <div className='w-full h-full  flex items-center justify-center px-5 py-[15px] bg-pink-100   rounded-2xl'>
                <div className='mr-2 text-orange-500'>
                    <GrLocation />
                </div>
                <div className='text-base font-normal'>
                    804 Shreeji Signature, Sargasan Cross Roads, Gandinagar, Gujarat - 382421
                </div>
            </div>
        </div>

        </>
    )
}
