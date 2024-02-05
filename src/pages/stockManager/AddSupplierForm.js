import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import React from 'react'
import ButtonComp from "./Stk_components/ButtonComp";
import SampleForm from "./Stk_components/Form";

function AddSupplierForm({onClose}) {
  const handleSubmit = () => {
    // Your form submission logic here
    // ...

    // After successful form submission, close the form
    onClose();
  };

  return (
      
      <Card color="white " shadow={true}  className=" w-fit p-10">
     
      <form className="mt-8 mb-2 w-fit max-w-screen-lg sm:w-96 justify-center">

           
            <SampleForm topic="Create Supplier" text="Name:" type="text" placeholder="ex-: Kasun Eranga"/>
            <SampleForm text="Email:" type="email" placeholder="kasuneranga@gmail.com"/>
          
            <SampleForm text="Address:" type="text" placeholder="123/B, Galle road, Katubedda"/>
            <SampleForm text="Telephone:" type="text" placeholder="0771 111 111"/>
            <SampleForm text="Stock Item:" type="text" placeholder="FR-34"/>

          

          <div className="flex justify-between p-5">
         <ButtonComp color="yellow" text="Clear"></ButtonComp>
         <ButtonComp color="green" text="Create" onClick={handleSubmit}></ButtonComp>
         </div>

      </form>

      </Card>
  
  )
}

export default AddSupplierForm