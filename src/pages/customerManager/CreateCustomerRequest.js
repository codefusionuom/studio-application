import { Button, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import React from 'react'

function CreateCustomerRequest() {
    return (
        <div className='bg-cl-4 p-20 rounded flex flex-col gap-32'>
            <div className='flex flex-col gap-10 '>
                <div className='bg-bg p-10 pl-32 rounded'>
                    <Typography className='font-Lato text-4xl font-normal font-500'>
                        Service    Information
                    </Typography>
                </div>
                <div className='flex justify-between items-start px-20 '>
                    <div className='flex flex-col gap-10 w-[310px]'>
                        <div className='flex flex-col gap-2'>
                            <Typography className='text-lg text-cl-2'>
                                Service Type
                            </Typography>
                            <Select label="Wedding Photography" className=''>
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Typography className='text-lg text-cl-2'>
                                Location                            </Typography>
                            <Input
                                type="text"
                                placeholder="Labugama"
                                className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Typography className='text-lg text-cl-2'>
                                Date
                            </Typography>
                            <Input
                                type="text"
                                placeholder="23-01-2024"
                                className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Typography className='text-lg text-cl-2'>
                                Coverage Type
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
                    </div>
                    <div className=''>
                        <div className='flex flex-col gap-2 w-[310px]'>
                            <Typography className='text-lg text-cl-2'>
                                Description
                            </Typography>
                            <Textarea label="Description about payment  " className='h-[150px] ' />
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='flex flex-col gap-10'>
                    <div className='bg-bg p-10 pl-32 rounded'>
                        <Typography className='font-Lato text-4xl font-normal font-500'>
                            Customer    Information
                        </Typography>
                    </div>
                    <div className='flex justify-between px-20'>
                        <div className='flex flex-col gap-10 w-[310px]'>
                            <div className='flex flex-col gap-2'>
                                <Typography className='text-lg text-cl-2'>
                                    Name
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
                                    Email
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
                        </div>
                        <div className='flex flex-col gap-10 w-[310px]'>
                            <div className='flex flex-col gap-2'>
                                <Typography className='text-lg text-cl-2'>
                                    Contact info
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
                                    Addres
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
                        </div>
                    </div>

                </div>
                
            </div>
            <div className='flex justify-between px-20'>
                    <Button className='bg-btn-warning text-lg'>Clear</Button>
                    <Button className='bg-btn-danger text-lg'>Reject</Button>
                    <Button className='bg-btn-info text-lg'>Leave</Button>
                    <Button className='bg-btn-success text-lg'>Confirm</Button>
                </div>
        </div>
    )
}

export default CreateCustomerRequest