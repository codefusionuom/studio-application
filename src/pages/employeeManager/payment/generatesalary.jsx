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
import { ToastError, ToastSuccess } from '../../customerManager/ToastAlert';







function PaySlip() {

    const location = useLocation();
    const { date, id } = location.state;



    const [empId,setempId] = useState(id)
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
    const [totalAllowance, setTotalAllowance] = useState([])
    const [totalDeduction, setTotalDeduction] = useState([])
    const [totalAdvance, setTotalAdvance] = useState([])
    const [empSalary, setEmpSalary] = useState([])
    const [grossEarnings, setGrossEarnings] = useState()
    const [grossDeductions, setGrossDeductions] = useState()
    const [totalNetPay, setTotalNetPay] = useState()


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
            setEmpSalary(result.data.employeePaymentDetail.empSalary)
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

              //// get Total advance
      axios.get(`http://localhost:5000/employeeManager/getSumAdvanceForSalary?id=${id}&date=${date}`)
      .then(result => {
        console.log(result)
        setTotalAdvance(result.data)
        console.log("total advance is "+totalAdvance);
      })
      .catch(err => console.log(err))

              //// get total allowance
      axios.get(`http://localhost:5000/employeeManager/getSumEmpAllowanceForSalary?id=${id}&date=${date}`)
      .then(result => {
        console.log(result)
        setTotalAllowance(result.data.sum)
        console.log("total allowance is "+totalAllowance);
      })
      .catch(err => console.log(err))

              //// get totla deduction
      axios.get(`http://localhost:5000/employeeManager/getSumEmpDeductionForSalary?id=${id}&date=${date}`)
      .then(result => {
        console.log(result)
        setTotalDeduction(result.data.sum)
        console.log("totaldeduction is "+totalDeduction);
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
    },);

    useEffect(() => {
        const tempotamount = otHours*otRate;
        setOtAmount(tempotamount)
    },);

    useEffect(() => {
        ///////salary calculation
      const tempgrossearnings = empSalary+otAmount+totalAllowance;
      setGrossEarnings(tempgrossearnings)
      const tempgrossdeductions = totalAdvance+totalDeduction;
      setGrossDeductions(tempgrossdeductions)
      const tempNetPay = tempgrossearnings-tempgrossdeductions;
      setTotalNetPay(tempNetPay)
      console.log("wwwwwwwwwwwwwwwwwwwwww");
    },);


    const create = () => {
        console.log(id);
        console.log(date);
        // console.log(month);
        // console.log(employee);
        // console.log(advance);
        // console.log(otSeconds);
        // console.log(otHours);
        // console.log(otRate);
        // console.log(allowance);
        // console.log("total advance is "+ totalAdvance);
        // console.log("total allowance is "+ totalAllowance);
        // console.log("totaldeduction is "+ totalDeduction);
        // console.log("salary is "+ empSalary);
        // const testarray = JSON.stringify({ allowance });
        // console.log(testarray);



        axios.post(`http://localhost:5000/employeeManager/generatePaySlip/?id=${id}`, {  totalNetPay, grossDeductions, grossEarnings, otAmount, date })
            .then(result => {
                console.log(result)
                ToastSuccess("Payslip generated")
                // setReload((prev)=>!prev)
                // window.location.reload()
                // navigate('/employeeManager')
            })
            .catch(err => {console.log(err);ToastError(err.message)})




    }






    return (
        <div>
        





        <div className=' px-6 py-4 bg-cl-4 rounded  border border-black-900 outline outline-1 outline-black'>
            <div className=' px-6 py-4 col-span-4 border border-black-900 outline outline-1 outline-black text-center font-bold'>
                Payslip for the month of {month} {year}
            </div>
            <div className='flex'>
                <div className='col-span-2 px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                    <p className='font-bold'>Employee Pay Summary</p>
                    <p>Employee Name        : {employee?.empName}</p>
                    <p>Department           : {employee?.department?.departmentName}</p>
                    <p>Date of Joining      : {joinedDate}</p>
                    <p>Pay Period           : {month} {year}</p>
                    <p>Pay Day              : {currentDate}</p>
                </div>
                <div className='col-span-2 px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-center '>
                    <p>Employee Net Pay</p>
                    <p className='font-bold'>{totalNetPay}</p>
                </div>
            </div>
            <div className='flex w-full'>
                <div className='w-1/2'>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 font-bold'>
                            <p>Earnnings</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right font-bold'>
                            <p>Amount</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Basic</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right'>
                            <p>{employee?.employeePaymentDetail?.empSalary}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2'>
                            <p>Over Time ({otHours} * {employee?.employeePaymentDetail?.overtimeRate})</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right'>
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
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right'>
                                            <p>{allowances?.Amount}</p>
                                        </div>
                                    </div>
                                    )
                                    })}
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className='flex'>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 font-bold'>
                            <p>Deductions</p>
                        </div>
                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right font-bold'>
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
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right'>
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
                                        <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right'>
                                            <p>{deductions?.Amount}</p>
                                        </div>
                                    </div>
                                    )
                                    })}
                    </div>
                </div> 
            </div>
            <div className='w-full flex'>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 font-bold'>
                    <p>Gross Earnings</p>
                </div>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right font-bold'>
                    <p>{grossEarnings}</p>
                </div>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 font-bold'>
                    <p>Gross Deductions</p>
                </div>
                <div className=' px-6 py-4 border border-black-900 outline outline-1 outline-black w-1/2 text-right font-bold'>
                    <p>{grossDeductions}</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black font-bold'>
                    <p>NET PAY</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black text-right font-bold'>
                    <p>Amount</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Gross Earnings</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black text-right'>
                    <p>{grossEarnings}</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black'>
                    <p>Total Deductions</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black text-right'>
                    <p>{grossDeductions}</p>
                </div>
            </div>
            <div className='flex w-full '>
                <div className='w-3/4  px-6 py-4 border border-black-900 outline outline-1 outline-black text-right font-bold'>
                    <p>Total New Payable</p>
                </div>
                <div className='w-1/4  px-6 py-4 border border-black-900 outline outline-1 outline-black text-right font-bold'>
                    <p>{totalNetPay}</p>
                </div>
            </div>
            
            
        </div>
        <div className="flex justify-right p-5">
        <Button color="green" onClick={(e) => {create(e)}}>Create</Button>
        </div>




        </div>
    )
}
export default PaySlip