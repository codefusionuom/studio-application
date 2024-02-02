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

function AddCategoryForm() {
  return (
      
      <Card color="white " shadow={true}  className=" w-fit p-10">
     
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 justify-center">

           
            <SampleForm topic="Make New Category" text="Category ID:"/>
            <SampleForm text="Category Name:"/>
            <SampleForm text="Department:"/>

         

          <div className="flex justify-between p-5">
         <ButtonComp color="yellow" text="Clear"></ButtonComp>
         <ButtonComp color="green" text="Create"></ButtonComp>
         </div>

      </form>

      </Card>
  
  )
}

export default AddCategoryForm