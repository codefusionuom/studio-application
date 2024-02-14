import { Button, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';

function Payment() {
    const [pos, setPos] = useState({
        customerId: "3",
        description: "fell",
        amount: 4500.00,
        offers: 230.00,
        payment: 233.00,
        status: "",
        type: ""
    })

    const { customerId, description, amount, offers, payment, status, type } = pos

    const handleSubmit = () => {
        axios.post("http://localhost:5000/customerManager/payment", {
            customerId, description, amount, offers, payment, status, type
        })
    }

    const formik = useFormik({
        initialValues: {
            customerId: "",
            description: "",
            amount: "",
            offers: "",
            payment: "",
            status: "",
            type: ""
        },
        validationSchema: Yup.object({
            customerId: Yup.string(),
            amount: Yup.number()
                .required('Required').typeError('Amount must be a number'),
            offers: Yup.number(),
            payment: Yup.number()
                .required('Required').typeError('Amount must be a number'),
        }),
        onSubmit: values => {
            console.log("hello")
            alert(JSON.stringify(values, null, 2));

        },
    });

    return (
        <div className='flex flex-col gap-8'> <div className='text-xl '>Payment</div>
            <div className='flex bg-cl-4 justify-between p-10'>


                {/* <div >
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div>{formik.errors.firstName}</div>
                    ) : null}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div>{formik.errors.lastName}</div>
                    ) : null}

                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <select id="type" {...formik.getFieldProps('type')}>
                        <option value="g1">g1</option>
                        <option value="g2">g2</option>
                        <option value="g3">g3</option>
                    </select>
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}

                    <button type="submit" onClick={formik.handleSubmit}>Submit</button>
                </div> */}


                <div className=' w-[310px] flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Typography className='text-lg text-cl-2'>
                            Event Id
                        </Typography>
                        {formik.touched.customerId && formik.errors.customerId ? (
                        <div>{formik.errors.customerId}</div>
                    ) : null}
                        <Input
                            id="customerId"
                            type="text"
                            {...formik.getFieldProps('customerId')}
                            placeholder="WP1025"
                            className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                            labelProps={{
                                className: "hidden",
                            }}
                            containerProps={{ className: "min-w-[100px]" }}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Typography className='text-lg text-cl-2' >
                            Type
                        </Typography>
                        <Select label="Select Version" id="type" {...formik.getFieldProps('type')} >
                            <Option value="online">Material Tailwind HTML</Option>
                            <Option value="offline">Material Tailwind React</Option>

                        </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Typography className='text-lg text-cl-2'>
                            Description
                        </Typography>
                        <Textarea label="Description about payment  " className='h-[150px] ' id="description"
                            type="text"
                            {...formik.getFieldProps('description')} />
                    </div>
                    <div>
                        <Button className='bg-btn-warning text-lg' onClick={formik.resetForm}>Clear</Button>
                    </div>
                </div>
                <div className=' w-[310px] flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Typography className='text-lg text-cl-2'>
                            Status
                        </Typography>
                        <Select label="Select Version" id="status" {...formik.getFieldProps('status')}>
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
                        { formik.errors.amount ? (
                        <div className=' text-red-500 text-sm'>{formik.errors.amount}</div>
                    ) : null}
                        <Input
                            id="amount"
                            type="text"
                            {...formik.getFieldProps('amount')}
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
                            id="offers"
                            type="text"
                            {...formik.getFieldProps('offers')}
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
                        {  formik.errors.payment ? (
                        <div className=' text-red-500 text-sm'>{formik.errors.payment}</div>
                    ) : null}
                        <Input
                            id="payment"
                            type="text"
                            {...formik.getFieldProps('payment')}
                            placeholder="45,000.00"
                            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                            labelProps={{
                                className: "hidden",
                            }}
                            containerProps={{ className: "min-w-[100px]" }}
                        />
                    </div>
                    <div >
                        <Button className='bg-btn-success text-lg' onClick={formik.handleSubmit}>Bill</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment 