import { Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axios.config';

function PaymentDetails() {
    const { id } = useParams();
    const [payment,setPayment]=useState({amount:""})

    useEffect(()=>{
        const fetchPayment=async()=>{
            const {data}= await axiosInstance.get(`/customerManager/payment/${id}`)
            setPayment(data)
            console.log(id,data)
        }
        fetchPayment()
    },[])

    return (
        <div className='flex flex-col gap-10'>
            <div className=' bg-cl-4 text-2xl rounded-md flex  py-10 px-20'>
                <Typography className=' text-2xl '>Payment</Typography> 
            </div>
            <div className=' flex justify-between gap-10 '>
                <div className='w-full bg-cl-4 rounded-md flex flex-col justify-around gap-2 py-4 px-10 h-[150px]'>
                    
                    <div className='flex items-center gap-4'>
                    <Typography className=' text-lg  font-bold text-cl-1 '>Customer Name :</Typography>
                        <Typography className=' text-sm text-cl-2 w-[180px]'>{payment?.customerName}</Typography>
                       

                    </div>
                    <div className='flex items-center gap-4'>
                    <Typography className=' text-lg  font-bold text-cl-1 '>Customer mobilePhone :</Typography>
                        <Typography className=' text-sm text-cl-2 w-[180px]'>{payment?.customerMobilePhone}</Typography>
                       

                    </div>
                </div>
                <div className='w-full bg-cl-4 grid grid-rows-3 grid-flow-col   gap-y-2 gap-x-32 rounded-md py-4 px-10 h-[150px]'>
                    <div className='flex gap-4 '>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Event :</Typography>
                        <Typography className=' text-lg text-cl-2 '>{payment?.event?.serviceType}</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Date :</Typography>
                        <Typography className=' text-lg text-cl-2 '>{(new Date(payment?.createdAt)).getFullYear()+"-"+((new Date(payment?.createdAt)).getMonth()+1)+"-"+(new Date(payment?.createdAt)).getDate()}</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Time :</Typography>
                        <Typography className=' text-lg text-cl-2 '>{(new Date(payment?.createdAt)).getHours()+":"+((new Date(payment?.createdAt)).getMinutes())}</Typography>

                    </div>
                    
                </div>
                
            </div>
            <div className=' flex justify-between gap-10'>
            
                <div className='w-full bg-cl-4 grid grid-rows-3 grid-flow-col   gap-y-2 gap-x-32 rounded-md py-4 px-10 h-[150px]'>
                    <div className='flex gap-4 '>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Amout :</Typography>
                        <Typography className=' text-lg text-cl-2 min-w-[120px]'>{payment?.amount}.00</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Offers :</Typography>
                        <Typography className=' text-lg text-cl-2 min-w-[120px]'>{payment?.offers ? payment?.offers : "0.00"}</Typography>

                    </div>
                    <div className='flex gap-4'>
                        <Typography className=' text-lg  font-bold text-cl-1 '>Payment :</Typography>
                        <Typography className=' text-lg text-cl-2 '>{payment?.payment}.00</Typography>

                    </div>
                    <div className='flex gap-4'>
                        
                    </div>
                    
                </div>
                <div className=' w-full bg-cl-4 rounded-md flex flex-col gap-2 py-4 px-10 h-[150px]'>
                    <Typography className=' text-lg pb-2'>Description :</Typography>
                    <Typography className=' text-sm text-cl-2 w-[360px]'> {payment?.description}</Typography>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetails