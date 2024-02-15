import { Typography } from '@material-tailwind/react'
import React from 'react'

function SMpaymentDetails() {
    return (
        <div className='flex flex-col gap-10'>
            <div className=' bg-cl-4 text-2xl rounded-md flex justify-between items-center py-10 px-20'>
                <Typography className=' text-2xl '>Payment</Typography> <Typography className=' text-2xl '>WP-10-643</Typography>
            </div>
            <div className=' flex justify-between gap-10 '>
                <div className='bg-cl-4 rounded-md flex flex-col gap-2 py-4 px-10 h-[150px]'>
                    <Typography className=' text-2xl pb-2'>Customer</Typography>
                    <div className='flex  gap-4'>
                        <Typography className=' text-sm text-cl-2 w-[180px]'>John Kushn</Typography>
                        <Typography className=' text-sm text-cl-2 w-[180px]'>0704585963</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-sm text-cl-2 w-[180px] '>John@gmail.com</Typography>
                        <Typography className=' text-sm text-cl-2 w-[180px] '>1H,galewela road,palmadulla,rathnapura</Typography>
                    </div>
                </div>
                <div className='w-full bg-cl-4 grid grid-rows-3 grid-flow-col   gap-y-2 gap-x-32 rounded-md py-4 px-10 h-[150px]'>
                    <div className='flex gap-4 '>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Event :</Typography>
                        <Typography className=' text-lg text-cl-2 '>WP-287</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Date :</Typography>
                        <Typography className=' text-lg text-cl-2 '>03-10-2024</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Time :</Typography>
                        <Typography className=' text-lg text-cl-2 '>8.42 PM</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Manager :</Typography>
                        <Typography className=' text-lg text-cl-2 '>CM-04</Typography>
                    </div>
                    <div className='flex gap-4 '>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Status :</Typography>
                        <Typography className=' text-lg text-cl-2 '>Full Payment</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Type :</Typography>
                        <Typography className=' text-lg text-cl-2 '>Normal</Typography>
                    </div>
                </div>
                
            </div>
            <div className=' flex justify-between gap-10'>
            
                <div className='w-full bg-cl-4 grid grid-rows-3 grid-flow-col   gap-y-2 gap-x-32 rounded-md py-4 px-10 h-[150px]'>
                    <div className='flex gap-4 '>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Amout :</Typography>
                        <Typography className=' text-lg text-cl-2 min-w-[120px]'>68</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Offers :</Typography>
                        <Typography className=' text-lg text-cl-2 min-w-[120px]'>3,000.00</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Payment :</Typography>
                        <Typography className=' text-lg text-cl-2 '>65,000.00</Typography>

                    </div>
                    <div className='flex gap-4'>
                        
                    </div>
                    
                </div>
                <div className='bg-cl-4 rounded-md flex flex-col gap-2 py-4 px-10 h-[150px]'>
                    <Typography className=' text-lg pb-2'>Description :</Typography>
                    <Typography className=' text-sm text-cl-2 w-[360px]'> A loyality customer</Typography>
                </div>
            </div>
        </div>
    )
}

export default SMpaymentDetails