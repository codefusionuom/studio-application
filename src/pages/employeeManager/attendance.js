import React from 'react'
import { Button, Input } from '@material-tailwind/react';
import AttendanceOverviewList from './attendanceoverview';




function Attendance() {
    return (
        <div>
            
            <div className='bg-cl-4 rounded'>
                
                <form>

                <div className='PersonalInfo pt-10'>
                
                <div className=''>
                    <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                    <p className='text-lg'>Attendance</p>
                    
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
                    <p className='pt-5'>Employee Name :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input label="Name" />
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Reporting Time :</p>
                        <div className="w-80  pt-1 pb-10">
                            <Input label="Designation" />
                        </div>
                    </div>
                    <div>
                        <p>Day Type :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Employee Status" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>End of Shift :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input label="Department" />
                        </div>
                    </div>
                    <div>
                        <p>Leaving Type :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Bank" />
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='flex justify-evenly pb-10 pt-10'>
                <div>
                </div>
                <div>
                    <Button>Submit</Button>
                </div>
            </div>

                </form>
            </div>

            <div className='pt-10'>
                <AttendanceOverviewList></AttendanceOverviewList>
            </div>


        </div>
    )
}
export default Attendance