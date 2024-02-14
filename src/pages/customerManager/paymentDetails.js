import { Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function PaymentDetails() {
    const { id } = useParams();
    const [payment,setPayment]=useState({amount:""})

    useEffect(()=>{
        const fetchPayment=async()=>{
            const {data}= await axios.get(`http://localhost:5000/customerManager/payment/${id}`)
            setPayment(data)
            console.log(id,data)
        }
        fetchPayment()
    },[])

    return (
        <div className='flex flex-col gap-10'>
            <div className=' bg-cl-4 text-2xl rounded-md flex justify-between items-center py-10 px-20'>
                <Typography className=' text-2xl '>Payment</Typography> <Typography className=' text-2xl '>WP-10-643</Typography>
            </div>
            <div className=' flex justify-between gap-10 '>
                <div className='bg-cl-4 rounded-md flex flex-col gap-2 py-4 px-10 h-[150px]'>
                    <Typography className=' text-2xl pb-2'>Customer</Typography>
                    <div className='flex  gap-4'>
                        <Typography className=' text-sm text-cl-2 w-[180px]'>{payment?.customer?.firstname +" "+ payment?.customer?.lastname}</Typography>
                        <Typography className=' text-sm text-cl-2 w-[180px]'>{payment?.customer?.mobilePhone}</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-sm text-cl-2 w-[180px] '>{payment?.customer?.email}</Typography>
                        <Typography className=' text-sm text-cl-2 w-[180px] '>{payment?.customer?.address}</Typography>
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
                        <Typography className=' text-lg text-cl-2 min-w-[120px]'>{payment?.amount}</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Offers :</Typography>
                        <Typography className=' text-lg text-cl-2 min-w-[120px]'>{payment?.offers}</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Payment :</Typography>
                        <Typography className=' text-lg text-cl-2 '>{payment?.payment}</Typography>

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

export default PaymentDetails