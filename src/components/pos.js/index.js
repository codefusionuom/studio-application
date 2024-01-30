import { Button, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import React from 'react'

function Payment() {
    return (
        <div className='flex flex-col gap-8'> <div className='text-xl '>Payment</div>
        <div className='flex bg-cl-4 justify-between p-10'>
            <div className=' w-[310px] flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <Typography className='text-lg text-cl-2'>
                        Event Id
                    </Typography>
                    <Input
                        type="text"
                        placeholder="WP1025"
                        className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                    />
                </div>
                
                <div className='flex flex-col gap-2'>
                    <Typography className='text-lg text-cl-2'>
                        Type
                    </Typography>
                    <Select label="Select Version" className=''>
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Typography className='text-lg text-cl-2'>
                        Description
                    </Typography>
                    <Textarea label="Description about payment  " className='h-[150px] ' />
                </div>
                <div>
                    <Button className='bg-btn-warning text-lg'>Clear</Button>
                </div>
            </div>
            <div className=' w-[310px] flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <Typography className='text-lg text-cl-2'>
                        Status
                    </Typography>
                    <Select label="Select Version">
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Typography className='text-lg text-cl-2'>
                        Amount
                    </Typography>
                    <Input
                        type="text"
                        placeholder="43,000.00"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Typography className='text-lg text-cl-2'>
                        Offers
                    </Typography>
                    <Input
                        type="text"
                        placeholder="2,000.00"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Typography className='text-lg text-cl-2'>
                        Payment
                    </Typography>
                    <Input
                        type="text"
                        placeholder="45,000.00"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                    />
                </div>
                <div >
                    <Button className='bg-btn-success text-lg'>Bill</Button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Payment 