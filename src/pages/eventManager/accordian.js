import React, { useState } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const Accordian = () => {
    const [open, setOpen] = useState(1);
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
   
  return (
    <div><Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
    <AccordionHeader
      onClick={() => handleOpen(1)}
      className={`border-b-0 transition-colors ${
        open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
      }`}
    >
      What is Material Tailwind? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="down-arrow"><path d="M22.782 13.8L17 19.582 11.218 13.8a1 1 0 0 0-1.414 1.414L16.29 21.7a.992.992 0 0 0 .71.292.997.997 0 0 0 .71-.292l6.486-6.486a1 1 0 0 0-1.414-1.414zm-5.71-11.658c-8.244 0-14.928 6.684-14.928 14.928C2.142 25.316 8.826 32 17.072 32 25.316 32 32 25.316 32 17.072c0-8.246-6.684-14.93-14.928-14.93zm0 27.858C9.944 30 4.144 24.2 4.144 17.072c0-7.128 5.8-12.928 12.928-12.928C24.2 4.142 30 9.942 30 17.072 30 24.2 24.2 30 17.072 30z"></path></svg>
    </AccordionHeader>
    <AccordionBody className="pt-0 text-base font-normal">
     <div>
        
     </div>
    </AccordionBody>
  </Accordion>
  </div>
  )
}

export default Accordian