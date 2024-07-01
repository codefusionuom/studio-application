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

    const [selectedMonth, setSelectedMonth] = useState ();

    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate((cur) => !cur);

    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView((cur) => !cur);







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


    // const opentest = () => {
    //     console.log(selectedDate);
    //     const sqlFormattedDate = formatDateForSQL(selectedDate);
    //     console.log(sqlFormattedDate);
    //   };


      const opentest =async (e) => {

        console.log("selecteddate"+selectedDate);

        // const sqlFormattedDate = formatDateForSQL(selectedDate);
        // console.log("sqlformat"+sqlFormattedDate);

        const dateString = formatDateForSQL(selectedDate);
        console.log("sqlformat"+dateString);


        // const dateString = sqlFormattedDate.toISOString();
        // console.log("dateString"+dateString);
        



        axios.get('http://localhost:5000/employeeManager/getCheckInTotal/', {
            params: {
                month: dateString,
                id: id,
                
            }
        })
         .then(result => {console.log(result)
             setCheckInTotal(result.data.totalCheckIns)
         })
         .catch(err => console.log(err))

         axios.get('http://localhost:5000/employeeManager/getCheckOutTotal/', {
            params: {
                month: dateString,
                id: id,
                
            }
        })
         .then(result => {console.log(result)
             setCheckOutTotal(result.data.totalCheckOuts)
         })
         .catch(err => console.log(err)) 

         console.log("In"+checkInTotal);
         console.log("Out"+checkOutTotal);
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


            





            

            {/* <div className='Earning pt-10'>
                
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
                                <SelectOption   key={user.id} value={user.id}>{user.empName}  </SelectOption>
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
            </div> */}



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
                <Button color='green' onClick={opentest}>Submit and view paysheet</Button>
                </div>
            </div>
        </div>








        </form>











        </div>
    )
}
export default EmployeePayment