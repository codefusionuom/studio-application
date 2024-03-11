import React from 'react'
import { Input } from "@material-tailwind/react";
import Datepicker from '../../../components/datePicker/Datepicker';
import { Button } from "@material-tailwind/react";
// import { Select, Option } from '@material-tailwind/react';
import { Select, Option, } from "@material-tailwind/react";









function SalaryList() {
    return (
        <div>





        <form>
        <div className='bg-cl-4 rounded'>



            <div>
            <div className='flex justify-evenly pt-5'>
                    <div className='mt-'>
                    <p>Select Employee ID :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Select size="lg" label="Select Employee ID" className="z-10">
                            <Option>#12345</Option>
                            <Option>#64532</Option>
                            <Option>#84521</Option>
                            
                        </Select>
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'></p>
                    <div className="w-80 pt-1 pb-10">
                    </div>
                    </div>
                </div>
            </div>





            
            <div className='PersonalInfo pt-10'>
                
                <div className=''>
                    <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                    <p className='text-2xl'>Personal Information</p>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'></div>
                    <div className='w-80 pt-5 pb-5'></div>
                    <div className='w-80 pt-5 pb-5'></div>
                    </div>
                </div>
                <div className='flex justify-evenly pt-5'>
                    <div className='pt-5'>
                    <p>Employee ID :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input disabled label="Select Employee ID" />
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Name :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input disabled label="Select Employee ID" />
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Designation :</p>
                        <div className="w-80  pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                    <div>
                        <p>Employee Status :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Department :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                    <div>
                        <p>Bank :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>EPF Number :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                    <div>
                        <p>Account Number :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='Earning pt-10'>
                
                <div className=''>
                    <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                    <p className='text-2xl'>Earning Information</p>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'></div>
                    <div className='w-80 pt-5 pb-5'></div>

                    
                    </div>
                </div>
                <div className='flex justify-evenly pt-5'>
                    <div className='pt-5'>
                    <p>Basic Salary :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input disabled label="Select Employee ID" />
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Basic Rate :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input disabled label="Select Employee ID" />
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Over Time Hours :</p>
                        <div className="w-80  pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                    <div>
                        <p>Hours Worked :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Overtime Hours :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                    <div>
                        <p>Overtime Amount :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Double Overtime Hours :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                    <div>
                        <p>Double Overtime Amount :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Bonus :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input disabled label="Select Employee ID" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className='Allowance pt-10'>
                
                <div className=''>
                    <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                    <p className='text-2xl'>Allowance</p>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'></div>
                    <div className='w-80 pt-5 pb-5'></div>
                    </div>
                </div>
                <div className='flex justify-evenly pt-5'>
                    <div className='pt-5'>
                    <p>  </p>
                    <div className="w-80 pt-1 pb-5">
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Cost</p>
                    <div className="w-80 pt-1 pb-5">
                    </div>
                    </div>
                    <div className='pt-5'>
                    <p>Percentage</p>
                    <div className="w-80 pt-1 pb-5">
                    </div>
                    </div>
                    <div className='pt-5'>
                    <p>Allowance</p>
                    <div className="w-80 pt-1 pb-5">
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Medical</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Transport</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Meals Pay</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Uniform</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Communication</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Education</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Child Care</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Other</p>
                        <div className="w-40  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-21 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                
                
                
            </div>



            <div className='Deductions pt-10'>
                
                <div className=''>
                    <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                    <p className='text-2xl'>Deductions</p>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'></div>
                    <div className='w-80 pt-5 pb-5'></div>
                    </div>
                </div>
                <div className='flex justify-evenly pt-5'>
                    <div className='pt-5'>
                    <p>  </p>
                    <div className="w-80 pt-1 pb-10">
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Cost</p>
                    <div className="w-80 pt-1 pb-5">
                    </div>
                    </div>
                    
                    <div className='pt-5'>
                    <p>Deduction</p>
                    <div className="w-80 pt-1 pb-5">
                    </div>
                    </div>
                </div>
                
                <div className='flex justify-evenly'>
                    <div>
                        <p>Medical</p>
                        <div className="w-60  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Health Insuarance</p>
                        <div className="w-60  pt-1 pb-10">
                        </div>
                    </div>
                    
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Uniform Cost</p>
                        <div className="w-60  pt-1 pb-10">
                        </div>
                    </div>
                    
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Training Cost</p>
                        <div className="w-60  pt-1 pb-10">
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Other</p>
                        <div className="w-60  pt-1 pb-10">
                        </div>
                    </div>
                    
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    <div>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="" />
                        </div>
                    </div>
                    
                </div>
                </div>


            <div className='paymentdetails pt-10'>
                <div className=''>
                    <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                    <p className='text-2xl'>Payment Details</p>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'></div>
                    <div className='w-80 pt-5 pb-5'></div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div className='pt-10'>
                        <p>Payment Period (From)</p>
                        <Datepicker></Datepicker>
                    </div>
                    <div className='pt-10'>
                    <p>Payment Period (To)</p>
                        <Datepicker></Datepicker>
                    </div>
                    <div className='pt-10'>
                    <p>Payment Date</p>
                        <Datepicker></Datepicker>
                    </div>
                </div>

            </div>
            <div className='flex justify-evenly pb-10 pt-10'>
                <div>
                    <Button variant='outlined'>Cancel</Button>
                </div>
                <div>
                </div>
            </div>
        </div>








        </form>











        </div>
    )
}
export default SalaryList