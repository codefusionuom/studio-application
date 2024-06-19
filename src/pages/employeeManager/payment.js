import React, { useEffect, useState } from 'react'
import { Input } from "@material-tailwind/react";
import Datepicker from '../../components/datePicker/Datepicker';
import { Button } from "@material-tailwind/react";
import ViewSalary from './payment/viewSalartbutton';
import DashCard2 from './dashButtonCard copy';
import EmployeePaymentDetails from './payment/employeePaymentDetails';
import ViewEmployeePaymentDetails from './payment/viewemployeePaymentDetails';
import axios from "axios";
import { Select } from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import CreateAllowancesDeductions from './payment/createAllowancesDeductions';
import CreateAdvance from './payment/createadvance';








function EmployeePayment() {


    const [users, setUser] = useState([])
    const [bank,setBank] = useState()
    const [id,setid] = useState()
    const [epfNumber,setEpfNumber] = useState()
    const [accountNumber,setAccountNumber] = useState()
    const [overtimeRate,setOvertimeRate] = useState()
    const [doubleovertimeRate,setDoubleovertimeRate] = useState()
    const [empDepartment,setEmpDepartment] = useState()
    const [empType,setEmpType] = useState()
    const [empSalary,setEmpSalary] = useState()
    




    useEffect(()=>{
        axios.get('http://localhost:5000/employeeManager/getEmployees')
        .then(result => setUser(result.data))
        .catch(err => console.log(err))
        console.log(users)
    },[])


    const OpenSelectHandle =async (e) => {
        axios.get('http://localhost:5000/employeeManager/getEmployeeByid/'+e)
         .then(result => {console.log(result)
             setid(e)
             setEmpSalary(result.data.empSalary)
         })
         .catch(err => console.log(err))
         
         axios.get('http://localhost:5000/employeeManager/getEmployeePaymentDetailsByid/'+e)
         .then(result => {console.log(result)
             setBank(result.data.bank)
             setEpfNumber(result.data.epfNumber)
             setAccountNumber(result.data.accountNumber)
             setOvertimeRate(result.data.overtimeRate)
             setDoubleovertimeRate(result.data.doubleovertimeRate)
         })
         .catch(err => console.log(err))
         
     }



    return (
        <div>
            <div>
                <div className='flex justify-evenly pb-5'>
                    <EmployeePaymentDetails></EmployeePaymentDetails>
                    <ViewSalary></ViewSalary>
                
                </div>
                <div className='flex justify-evenly pb-5'>
                    <ViewEmployeePaymentDetails></ViewEmployeePaymentDetails>
                    <CreateAllowancesDeductions></CreateAllowancesDeductions>
                </div>
                <div className='flex justify-evenly pb-5'>
                    <CreateAdvance></CreateAdvance>
                    <CreateAllowancesDeductions></CreateAllowancesDeductions>
                </div>
            </div>





        <form>
        <div className='bg-cl-4 rounded'>


            





            

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
                    <p>Employee Name :</p>
                    <div className="w-80 pt-1 pb-10">
                    <Select label='Select Name' onChange={OpenSelectHandle}>
                            {users.map((user) => {
                            return (
                                <SelectOption   key={user.id} value={user.id}>{user.empName} </SelectOption>
                                );},
                                )}
                          </Select>
                    </div>
                    </div>
                    <div>
                    <p className='pt-5'>Basic Salary :</p>
                    <div className="w-80 pt-1 pb-10">
                        <Input label="Basic Salary" value={empSalary}/>
                    </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Overtime Hours :</p>
                        <div className="w-80  pt-1 pb-10">
                            <Input label="Overtime Hours" />
                        </div>
                    </div>
                    <div>
                        <p>Double Overtime Hours :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Double Overtime Hours" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Overtime Rate :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input label="Overtime Rate" value={overtimeRate}/>
                        </div>
                    </div>
                    <div>
                        <p>Double Overtime Rate :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Double Overtime Rate" value={doubleovertimeRate}/>
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Overtime Amount :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Input label="Overtime Amount" />
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
                <Button color='green'>Submit and view paysheet</Button>
                </div>
            </div>
        </div>








        </form>











        </div>
    )
}
export default EmployeePayment