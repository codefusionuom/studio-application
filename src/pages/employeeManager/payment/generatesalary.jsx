import React, { useEffect, useState } from 'react'
import { Input } from "@material-tailwind/react";
import Datepicker from '../../../components/datePicker/Datepicker';
import { Button } from "@material-tailwind/react";
import ViewSalary from '../payment/viewSalartbutton';
import DashCard2 from '../dashButtonCard copy';
import EmployeePaymentDetails from '../payment/employeePaymentDetails';
import ViewEmployeePaymentDetails from '../payment/viewemployeePaymentDetails';
import axios from "axios";
import { Select } from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
// import CreateAdvance from './payment/createadvance';
import CreateAdvance from '../advance/createadvance'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog } from '@material-tailwind/react';
import axiosInstance from '../../../config/axios.config';
// import { toast } from 'react-toastify';
import { Card } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';







function PaySlip() {

    const location = useLocation();
    const { date, id } = location.state;



    // const [id,setid] = useState(idx)
    // const [salaryDate, setSalaryDate] = useState(date)
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [employee, setEmployee] = useState([])
    const [joinedDate, setJoinedDate] = useState([])
    const [currentDate, setCurrentDate] = useState()
    const [allowance, setAllowances] = useState([])
    const [deduction, setDeductions] = useState([])
    const [advance, setAdvance] = useState([])
    const [otSeconds, setOtSeconds] = useState([])
    const [otHours, setOtHours] = useState()
    const [otAmount, setOtAmount] = useState()
    const [otRate, setOtRate] = useState([])
    


    useEffect(() => {
        /////Get month and year from date
        const [year, month] = date.split('-'); // Split the date string
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        const paymonth = monthNames[parseInt(month, 10) - 1];
        setMonth(paymonth)
        setYear(year)
        ////get employee, deratment, payment details
        axios.get(`http://localhost:5000/employeeManager/getEmployeesForSalary?id=${id}`)
          .then(result => {
            console.log(result)
            setEmployee(result.data)
            console.log("employee is "+employee);
            setOtRate(result.data.employeePaymentDetail.overtimeRate)
          })
          .catch(err => console.log(err))
        //// current date
        const Todaydate = new Date();
        const formattedDate = `${String(Todaydate.getMonth() + 1).padStart(2, '0')}/${String(Todaydate.getDate()).padStart(2, '0')}/${Todaydate.getFullYear()}`;
        setCurrentDate(formattedDate);
        
        ///get advances
        axios.get(`http://localhost:5000/employeeManager/getAdvanceForSalary?id=${id}&date=${date}`)
          .then(result => {
            console.log(result)
            setAdvance(result.data.rows)
            console.log("advances is "+advance);
          })
          .catch(err => console.log(err))
          //// get allowances
        axios.get(`http://localhost:5000/employeeManager/getEmpAllowanceForSalary?id=${id}&date=${date}`)
        .then(result => {
          console.log(result)
          setAllowances(result.data.rows)
          console.log("Allowance is "+allowance);
        })
        .catch(err => console.log(err))
      //// get deductions
      axios.get(`http://localhost:5000/employeeManager/getEmpDeductionForSalary?id=${id}&date=${date}`)
        .then(result => {
          console.log(result)
          setDeductions(result.data.rows)
          console.log("deduction is "+deduction);
        })
        .catch(err => console.log(err))
        //// get OT Seconds
      axios.get(`http://localhost:5000/employeeManager/getOTForSalary?id=${id}&date=${date}`)
      .then(result => {
        console.log(result)
        setOtSeconds(result.data)
        console.log("deduction is "+deduction);
      })
      .catch(err => console.log(err))
        
    }, []);


    useEffect(() => {
        const jd = employee?.createdAt;
        if (employee.createdAt) {
            const trimmedString = jd.substring(0, 10);
            setJoinedDate(trimmedString);
        }
    }, [employee]);


    useEffect(() => {
        const hours = Math.floor(otSeconds / 3600);
        setOtHours(hours)
    }, [otSeconds]);

    useEffect(() => {
        const tempotamount = otHours*otRate;
        setOtAmount(tempotamount)
    }, [otHours]);


    const test = () => {
        console.log(id);
        console.log(date);
        console.log(month);
        console.log(employee);
        console.log(advance);
        console.log(otSeconds);
        console.log(otHours);
        console.log(otRate);
        console.log(allowance);
    }






    return (
        <div>
        





        <div className=' px-6 py-4 bg-cl-4 rounded  border border-black-900 outline outline-1 outline-black'>
            <div className=' px-6 py-4 col-span-4 border border-black-900 outline outline-1 outline-black'>
                Payslip for the month of {month} {year}
            </div>
            <div className='flex'>
                <div className='col-span-2 px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                    <p>Employee Pay Summary</p>
                    <p>Employee Name        : {employee?.empName}</p>
                    <p>Department           : {employee?.department?.departmentName}</p>
                    <p>Date of Joining      : {joinedDate}</p>
                    <p>Pay Period           : {month} {year}</p>
                    <p>Pay Day              : {currentDate}</p>
                </div>
                <div className='col-span-2 px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                    <p>Employee Net Pay</p>
                    <p>Amount</p>
                </div>
            </div>
            <div className='flex w-full'>
                <div className='w-1/2'>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Earnnings</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Amount</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Basic</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>{employee?.employeePaymentDetail?.empSalary}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Over Time ({otHours} * {employee?.employeePaymentDetail?.overtimeRate})</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>{otAmount}</p>
                        </div>
                    </div>
                    <div>
                        {allowance && allowance.map((allowances)=>{
                            return (
                                    <div className='flex'>
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                                            <p>{allowances?.paymentAllowanceDeduction?.allowanceDeductionName}</p>
                                        </div>
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                                            <p>{allowances?.Amount}</p>
                                        </div>
                                    </div>
                                    )
                                    })}
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Deductions</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Amount</p>
                        </div>
                    </div>
                    <div>
                        {advance && advance.map((advances)=>{
                            return (
                                    <div className='flex'>
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                                            <p>Advance</p>
                                        </div>
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                                            <p>{advances?.advanceAmount}</p>
                                        </div>
                                    </div>
                                    )
                                    })}
                    </div>
                    <div>
                        {deduction && deduction.map((deductions)=>{
                            return (
                                    <div className='flex'>
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                                            <p>{deductions?.paymentAllowanceDeduction?.allowanceDeductionName}</p>
                                        </div>
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                                            <p>{deductions?.Amount}</p>
                                        </div>
                                    </div>
                                    )
                                    })}
                    </div>
                </div> 
            </div>
            <div className='w-full flex'>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                    <p>Gross Earnings</p>
                </div>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                    <p>Amount</p>
                </div>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                    <p>Gross Deductions</p>
                </div>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                    <p>Amount</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>NET PAY</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Amount</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Gross Earnings</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Amount</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Total Deductions</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Amount</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Total New Payable</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Amount</p>
                </div>
            </div>
            
            
        </div>



        <Button onClick={(e) => {test(e)}}></Button>
        </div>
    )
}
export default PaySlip