import React from 'react'
import { Input } from "@material-tailwind/react";
import Datepicker from '../../components/datePicker/Datepicker';
import { Button } from "@material-tailwind/react";








function EmployeePayment() {
    return (
        <div>


       <form>
        <div className='bg-cl-4 rounded'>
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
                <div className='flex justify-evenly'>
                    <div className='pt-5'>
                    <p>Employee ID :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input label="Username" />
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Name :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input label="Name" />
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Designation :</p>
                        <div className="w-80  pt-1 pb-10">
                            <Input label="Designation" />
                        </div>
                    </div>
                    <div>
                        <p>Employee Status :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Employee Status" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Department :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input label="Department" />
                        </div>
                    </div>
                    <div>
                        <p>Bank :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Bank" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>EPF Number :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="EPF Number" />
                        </div>
                    </div>
                    <div>
                        <p>Account Number :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Account Number" />
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
                <div className='flex justify-evenly'>
                    <div className='pt-5'>
                    <p>Basic Salary :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input label="Basic Salary" />
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Basic Rate :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input label="Basic Rate" />
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Over Time Hours :</p>
                        <div className="w-80  pt-1 pb-10">
                            <Input label="Over Time Hours" />
                        </div>
                    </div>
                    <div>
                        <p>Hours Worked :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Hours Worked" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Overtime Hours :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input label="Overtime Hours" />
                        </div>
                    </div>
                    <div>
                        <p>Overtime Amount :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Overtime Amount" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Double Overtime Hours :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Double Overtime Hours" />
                        </div>
                    </div>
                    <div>
                        <p>Double Overtime Amount :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Double Overtime Amount" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Bonus :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Bonus" />
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
                <div className='flex justify-evenly'>
                    <div className='pt-5'>
                    <p>  </p>
                    <div className="w-80 pt-1 pb-10">
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Cost</p>
                    <div className="w-80 pt-1 pb-10">
                    </div>
                    </div>
                    <div className='pt-5'>
                    <p>Percentage</p>
                    <div className="w-80 pt-1 pb-10">
                    </div>
                    </div>
                    <div className='pt-5'>
                    <p>Allowance</p>
                    <div className="w-80 pt-1 pb-10">
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
                
                <div className='flex justify-evenly pt-10'>
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
                    <p>Payment Period (From)</p>
                        <Datepicker></Datepicker>
                    </div>
                    <div className='pt-10'>
                    <p>Payment Period (From)</p>
                        <Datepicker></Datepicker>
                    </div>
                </div>

            </div>
            <div className='flex justify-evenly pb-10 pt-10'>
                <div>
                    <Button>Cancel</Button>
                </div>
                <div>
                <Button>Submit</Button>
                </div>
            </div>
        </div>








        </form>











        </div>
    )
}
export default EmployeePayment