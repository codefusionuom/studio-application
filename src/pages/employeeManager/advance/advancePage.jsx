// import React from 'react'
// import EmployeeList from './employeeList.js'
// import RegisterEmployee from './empForms/registerEmployees.jsx'
// import AdvanceSalary from './empForms/advanceSalary.jsx'
// import { QuickView1 } from './dashQuick copy.js'
// import DashCard from './dashButtonCard.js'
// import { Dialog } from '@material-tailwind/react'
// import { useState } from 'react'



// function AdvancePage() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen((cur) => !cur);
//     return (
//         <div>
//             <div>
//                 <QuickView1></QuickView1>
//             </div>
//             <div className='flex justify-evenly pb-5'>
//                 {/* <RegisterEmployee></RegisterEmployee> */}
//                 <div>
//                     <DashCard className="cursor-pointer" title2={"Register Employee"} title3={"Add Personal Here"} onClick={handleOpen} />
//                     <Dialog
//                         open={open}
//                         handler={handleOpen}
//                         className="bg-transparent shadow-none w-fit"
//                     ><RegisterEmployee/>
//                     </Dialog>
//                 </div>
//                 <AdvanceSalary></AdvanceSalary>
//             </div>
//             <div className='employeeList'>
//                 <EmployeeList></EmployeeList>
//             </div>
//         </div>
//     )
// }
// export default AdvancePage