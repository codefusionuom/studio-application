// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Button,
//   Dialog,
//   Card,
//   CardBody,
//   Typography,
// } from "@material-tailwind/react";

// function CategoryList({ title }) {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleOpen = () => setOpen((cur) => !cur);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/stockManager/categoryList");
//         const { success, message, categories } = response.data;
//         if (success) {
//           setCategories(categories);
//         } else {
//           setError(message);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch categories");
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/stockManager/category/${id}`);
//       setCategories(categories.filter((category) => category.id !== id));
//       console.log("Successfully deleted category")
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };
  

//   const handleEdit = async (categoryId) => {
//     try {
//       // Implement your logic to fetch the category data to be edited
//       const response = await axios.get(`http://localhost:5000/stockManager/category/${categoryId}`);
//       const { success, message, category } = response.data;
//       if (success) {
//         // Handle the edit functionality using the fetched category data
//         console.log("Editing category:", category);
//       } else {
//         console.error("Failed to fetch category details:", message);
//       }
//     } catch (error) {
//       console.error("Error editing category:", error);
//     }
//   };

//   return (
//     <>
//       <Button className="cursor-pointer bg-blue-700 text-white text-lg" onClick={handleOpen}>
//         {title}
//       </Button>

//       <Dialog open={open} handler={handleOpen} className="bg-transparent shadow-none w-fit">
//         <Card className="mx-auto w-full">
//           <CardBody className="flex flex-col gap-4">
//             <Typography variant="h4" color="blue-gray">
//               Category List
//             </Typography>

//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>Error: {error}</p>
//             ) : (
//               <div className="overflow-auto">
//                 <table className="w-full text-left table-auto min-w-max">
//                   <thead>
//                     <tr>
//                       <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Category ID</th>
//                       <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Category Name</th>
//                       <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Description</th>
//                       <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 ">Delete</th>
//                       <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Edit</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {categories.map((category) => (
//                       <tr key={category.id}>
//                         <td className="p-4">{category.categoryId}</td>
//                         <td className="p-4">{category.categoryName}</td>
//                         <td className="p-4">{category.description}</td>
//                         <td className="p-4">
//                           <Button color="red" onClick={() => handleDelete(category.id)}>
//                             Delete
//                           </Button> </td>
//                           <td>
//                           <Button color="blue" onClick={() => handleEdit(category.categoryId)}>
//                             Edit
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardBody>
//         </Card>
//       </Dialog>
//     </>
//   );
// }

// export default CategoryList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function CategoryList({ title }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpen((cur) => !cur);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/stockManager/categoryList");
      const { success, message, categories } = response.data;
      if (success) {
        setCategories(categories);
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/stockManager/category/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      console.log("Successfully deleted category");
      alert("Successfully deleted category");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = async (categoryId) => {
    try {
      // Implement your logic to fetch the category data to be edited
      const response = await axios.get(`http://localhost:5000/stockManager/category/${categoryId}`);
      const { success, message, category } = response.data;
      if (success) {
        // Handle the edit functionality using the fetched category data
        console.log("Editing category:", category);
      } else {
        console.error("Failed to fetch category details:", message);
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleCategoryCreated = (newCategory) => {
    // Add the newly created category to the list
    setCategories([...categories, newCategory]);
  };

  return (
    <>
      <Button className="cursor-pointer bg-blue-700 text-white text-lg" onClick={handleOpen}>
        {title}
      </Button>

      <Dialog open={open} handler={handleOpen} className="bg-transparent shadow-none w-fit">
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Category List
            </Typography>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div className="overflow-auto">
                <table className="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Category ID</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Category Name</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Description</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Delete</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="p-4">{category.categoryId}</td>
                        <td className="p-4">{category.categoryName}</td>
                        <td className="p-4">{category.description}</td>
                        <td className="p-4">
                          <Button color="red" onClick={() => handleDelete(category.id)}>
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button color="blue" onClick={() => handleEdit(category.categoryId)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export default CategoryList;

