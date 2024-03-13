import React, { useState } from "react";
import axios from 'axios';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";

import SmallCard from "../../../components/cards/card";

function AddCategoryForm({ title }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    categoryName: "",
    description: "",
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setOpen((cur) => !cur);
  }

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.categoryId.trim()) {
      newErrors.categoryId = "Category ID is required";
      isValid = false;
    } else {
      const categoryIdPattern = /^C-\d{4}$/;
      if (!categoryIdPattern.test(formData.categoryId)) {
        newErrors.categoryId = "Category ID should be in the format C-0001";
        isValid = false;
      }
    }

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = "Category Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post("http://localhost:5000/stockManager/category", formData);
        setSuccessMessage("Category created successfully");
        handleClose();
        setFormData({
          categoryId: "",
          categoryName: "",
          description: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error creating category:", error);
        setErrorMessage("Failed to create category");
      }
    }
  };
  
  const handleClear = () => {
    setFormData({
      categoryId: "",
      categoryName: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <>
      <SmallCard
        className="cursor-pointer"
        title={title}
        onClick={handleOpen}
      />

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add New Category
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Category details Here
            </Typography>

            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category ID:
                </Typography>
                <Input
                  label="Category ID"
                  size="lg"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  placeholder="C-0001"
                  error={errors.categoryId}
                />
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category Name:
                </Typography>
                <Input
                  label="Category Name"
                  size="lg"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  placeholder=""
                  error={errors.categoryName}
                />
              </div>
            </div>

            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col w-full">
                <Typography className="mb-2" variant="h6">
                  Description:
                </Typography>
                <Textarea
                  label="Enter Description here"
                  size="lg"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex flex-row justify-between">
              <Button className="bg-yellow-800" onClick={handleClear}>
                Clear
              </Button>
              <Button className="bg-green-600" onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default AddCategoryForm;






// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// function AddCategoryForm({ title }) {
//     const [formData, setFormData] = useState({
//         categoryId: '',
//         categoryName: '',
//         description: '',
//     });

//     const handleSubmit = async () => {
//         try {
//             await axios.post('http://localhost:5000/stockManager/category', formData);
//             console.log('Category created successfully');

//             // Clear form data after successful submission
//             setFormData({
//                 categoryId: '',
//                 categoryName: '',
//                 description: '',
//             });
//         } catch (error) {
//             console.error('Error creating category:', error);
//         }
//     };

//     const formik = useFormik({
//         initialValues: {
//             categoryId: '',
//             categoryName: '',
//             description: '',
//         },
//         validationSchema: Yup.object({
//             categoryId: Yup.string().required('Category ID is required'),
//             categoryName: Yup.string().required('Category Name is required'),
//         }),
//         onSubmit: (values) => {
//             setFormData(values);
//             handleSubmit();
//         },
//     });

//     return (
//         <div className="flex flex-col gap-8">
//             <div className="text-xl">Add Category</div>
//             <div className="flex bg-cl-4 justify-between p-10">
//                 <div className="w-[310px] flex flex-col gap-6">
//                     <div className="flex flex-col gap-2">
//                         <Typography className="text-lg text-cl-2">Category ID</Typography>
//                         <Input
//                             id="categoryId"
//                             type="text"
//                             {...formik.getFieldProps('categoryId')}
//                             placeholder="C-001"
//                         />
//                         {formik.touched.categoryId && formik.errors.categoryId && (
//                             <div className="text-red-500 text-sm">{formik.errors.categoryId}</div>
//                         )}
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <Typography className="text-lg text-cl-2">Category Name</Typography>
//                         <Input
//                             id="categoryName"
//                             type="text"
//                             {...formik.getFieldProps('categoryName')}
//                             placeholder="Category Name"
//                         />
//                         {formik.touched.categoryName && formik.errors.categoryName && (
//                             <div className="text-red-500 text-sm">{formik.errors.categoryName}</div>
//                         )}
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <Typography className="text-lg text-cl-2">Description</Typography>
//                         <Textarea
//                             id="description"
//                             type="text"
//                             {...formik.getFieldProps('description')}
//                             placeholder="Description"
//                         />
//                     </div>
//                     <div>
//                         <Button className="bg-btn-warning text-lg" onClick={formik.resetForm}>
//                             Clear
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="w-[310px] flex flex-col gap-6">
//                     <Button className="bg-btn-success text-lg" onClick={formik.handleSubmit}>
//                         Create Category
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddCategoryForm;
