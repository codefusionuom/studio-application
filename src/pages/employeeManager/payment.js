import React from 'react'
import { Input } from "@material-tailwind/react";







function EmployeePayment() {
    return (
        <div>





        <form>
        <div className='bg-cl-4 rounded'>
            <div className='PersonalInfo pt-10'>
                
                <div className=''>
                    <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                    <p className='text-lg'>Personal Information</p>
                    
                    </div>
                    <div className='w-80 pt-5 pb-5'>
                    
                    </div>
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
                        <Input label="Username" />
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Designation :</p>
                        <div className="w-80  pt-1 pb-10">
                            <Input label="Username" />
                        </div>
                    </div>
                    <div>
                        <p>Employee Status :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Username" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Department :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input label="Username" />
                        </div>
                    </div>
                    <div>
                        <p>Bank :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Username" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>EPF Number :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Username" />
                        </div>
                    </div>
                    <div>
                        <p>Account Number :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Username" />
                        </div>
                    </div>
                </div>
            </div>
        </div>








        </form>











        </div>
    )
}
export default EmployeePayment