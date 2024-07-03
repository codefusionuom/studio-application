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
// import CreateAdvance from './payment/createadvance';
import CreateAdvance from './advance/createadvance'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog } from '@material-tailwind/react';
import axiosInstance from '../../config/axios.config';
// import { toast } from 'react-toastify';
import { Card } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';









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
    const [empId,setEmpId] = useState()
    const [checkInTotal,setCheckInTotal] = useState()
    const [checkOutTotal,setCheckOutTotal] = useState()
    const [search, setSearch] = useState()
    const [resultVisible, setResultVisible] = useState()
    const [errorName, setErrorName] = useState()
    const [empName, setEmpName] = useState()
    const [searchValue, setSearchValue] = useState()
    const [ToastError, setToastError] = useState()
    const [selectedMonth, setSelectedMonth] = useState ();
    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate((cur) => !cur);
    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView((cur) => !cur);
    const navigate = useNavigate();



    const generatepayslip = (id, monthselected) => {
        const formateddate = formatDateForSQL(monthselected)
        console.log("date " + formateddate);
        console.log("id " + id);
        navigate("/employeeManager/payslip", {
            state: {
                 date: formateddate,
                 id: id 
                },
          })
    }


    useEffect(() => {
        if (search !== "") {
        handleSearch();
        console.log(search);
        console.log("search when name change");
        }
      }, [search]);


      // Search Employee
    const handleSearch = async () => {
        setResultVisible(true)
        console.log("searching begin");
        try {
        const { data } = await axiosInstance.get(`/employeeManager/getEmployeeSearch/?empName=${search}`)
        if (!data) {
            ToastError("no employee exist")
        }
        console.log(data);
        setUser(data);
        // setResults(data.count)
        } catch (error) {
        console.log(error);
        ToastError(error)
        }
    };



     const [selectedDate, setSelectedDate] = useState(new Date());

     const renderMonthContent = (month, shortMonth, longMonth, day) => {
       const fullYear = new Date(day).getFullYear();
       const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;
       return <span title={tooltipText}>{shortMonth}</span>;
     };


     function formatDateForSQL(date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        // const day = ('1').slice(-2);
        // const hours = ('0').slice(-2);
        // const minutes = ('0').slice(-2);
        // const seconds = ('0').slice(-2);
        return `${year}-${month}`;
    }


    return (
        <div>
            <div>
                <div className='flex justify-evenly pb-5'>
                    <div>
                        <DashCard2 title2={"Create Employee Payment Details"} title3={""} onClick={handleOpenCreate} />
                        <Dialog
                            open={openCreate}
                            handler={handleOpenCreate}
                            className="bg-transparent shadow-none w-fit"
                        >
                            <EmployeePaymentDetails></EmployeePaymentDetails>
                        </Dialog>
                    </div>
                    <div>
                        <DashCard2 title2={"View Employee Payment Details"} title3={""} onClick={handleOpenView} />
                        <Dialog
                            open={openView}
                            handler={handleOpenView}
                            className="bg-transparent shadow-none w-fit"
                        >
                            <ViewEmployeePaymentDetails/>
                        </Dialog>
                    </div>
                </div>
                <div className='flex justify-evenly pb-5'>
                    {/* <ViewEmployeePaymentDetails></ViewEmployeePaymentDetails> */}
                </div>
                <div className='flex justify-evenly pb-5'>
                    
                </div>
            </div>
        <form>
        <div className='bg-cl-4 rounded'>


         
                    {/* <div>
                        <p>Pick Month :</p>
                        <div className="w-80 pt-1 pb-10">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            renderMonthContent={renderMonthContent}
                            showMonthYearPicker
                            dateFormat="MM/yyyy"
                            />
                        </div>
                    </div>
                </div>
            </div>  */}



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
                        <p>Payment Period</p>
                        <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        renderMonthContent={renderMonthContent}
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                        />
                    </div>
                        <div className='pt-10'>
                        <p>Select Employee</p>
                        <div className="relative ">
                    <div className="relative flex w-full max-w-[24rem] ">
                      <Input
                        error={errorName ? "true" : null}
                        label="Enter Name"
                        value={empName}
                        onChange={(e) => {setSearch(e.target.value);setEmpName(e.target.value)}}
                        className="pr-20"
                        containerProps={{
                          className: "min-w-0",
                        }}
                      />
                    </div>

                    {resultVisible ? (
                    <div>
        
      
                    {users && users.map((user)=>{
                      return (
                        <Card className="p-2 rounded-md absolute top-10 w-full max-h-36 overflow-scroll z-[999]">
                        <div className="" onClick={()=>{setEmpId(user.id); setEmpName(user.empName); setSearchValue(""); setResultVisible(false)}}>
                          <div className="text-"> 
                          {user.empName}
                          </div>
                        </div>
                        </Card>
                      )
                    })}
                    </div>
                    ) : null}
         
                  </div>
                    </div>
                </div>

            </div>
            <div className='flex justify-evenly pb-10 pt-10'>
                <div>
                    <Button variant='outlined'>Cancel</Button>
                </div>
                <div>
                <Button color='green' onClick={() => generatepayslip(empId,selectedDate)}>Submit and view paysheet</Button>
                </div>
            </div>
        </div>
        </form>
        </div>
    )
}
export default EmployeePayment