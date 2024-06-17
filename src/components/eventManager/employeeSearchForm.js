import { Alert, Avatar, IconButton, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import React, { useState, useRef, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayListWithAvatar from "./listDisplayWithAvatar";
const EmployeeSearchForm = ({
  // title,
  eventList,
  eventTypes,
  resultDisplayfield1,
  resultDisplayfield2,
 asignedEmployeesList,
  setAsignedEmployeesList
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultDisplayfield1Val, setResultDisplayfield1Val] = useState("");
  const [resultDisplayfield2Val, setResultDisplayfield2Val] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [asignedEmployees, setAsignedEmployees] = useState();
  const [isClickedSearchBar, setIsClickedSearchBar] = useState(false);
  const dropdownRef = useRef(null);
  const searchBarRef = useRef(null);

  console.log("clicked");
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = eventList.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    console.log(`Category: ${selectedCategory}, Search Query: ${searchQuery}`);
  };

  
  useEffect(() => {
    console.log("resultDisplayfield2 :" + resultDisplayfield2);
    setSearchResults(eventList);
    setResultDisplayfield1Val(resultDisplayfield1);
    setResultDisplayfield2Val(resultDisplayfield2);
  }, [eventList, resultDisplayfield1, resultDisplayfield2]);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsClickedSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, searchBarRef]);

  const handleResultClick = (result) => {
    if (!asignedEmployeesList.some(emp => emp.empId === result.id)) {
      setAsignedEmployeesList((prevEmpList) => [
        ...prevEmpList,
        {
          empId: result["id"],
          empName: result["empName"],
          empDepartment : result["empDepartment"],
        },
      ])
    };
   
  };
  
  return (
    <div className="max-w-2xl mx-auto min-w-96 max-h-fit" ref={searchBarRef}>
      

      <form onSubmit={handleSubmit}>
        <div
          className="flex relative w-full"
          onClick={() => setIsClickedSearchBar(true)}
        >
          {/* <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Your Email
          </label> */}

          <div className=" w-full flex justify-between ">
          <button
            id="dropdown-button"
            type="button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-full "
            onClick={toggleDropdown}
          >
            {selectedCategory}
            <svg
              className="flex-row justify-end w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow mt-1 dark:bg-gray-700 w-2/5 "
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {eventTypes.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>
          
          <div className="w-full">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder={`Search ${eventTypes.join(",")}...`}
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
            {/* Search Results */}
            {/* {isClickedSearchBar && (
            <div className="flex mt-4  justify-start">
              {searchResults.length > 0 ? (
                <ul className="list-disc pl-5">
              {searchResults.map((result, index) => (
                <div key={index} className="w-full" 
                onClick={() => {}}>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    {result[resultDisplayfield1Val]}
                  </h6>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                
                    {resultDisplayfield2=="date" ? result[resultDisplayfield2Val].slice(0, 10) : "tttttttttt"}
                  </p>
                </div>
              ))}
            </ul>
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            )} */}
          </div>
        </div>
      </form>
   
      <div className="w-full  flex justify-between  max-h-80  mx-auto">
      <DisplayListWithAvatar itemList={asignedEmployeesList}  displayField1={"empName"} displayField2={"empDepartment"}   setAsignedEmployeesList={setAsignedEmployeesList} />
        
        <div className="w-full  overflow-y-auto">
          {isClickedSearchBar && (
            <div className="mt-4  justify-start overflow-y-auto">
              {searchResults.length > 0 ? (
                <ul className="list-disc ">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="w-full"
                      onClick={() => {
                        
                        handleResultClick(result)
                        console.log("asignedEmployeesList :" +asignedEmployeesList.map((emp) =>emp['empName']));
                      }
                    }
                    >
                      <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        {result[resultDisplayfield1Val]}
                      </h6>
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                        {/* {result.customerId} */}
                        {resultDisplayfield2 == "date"
                          ? result[resultDisplayfield2Val].slice(0, 10)
                          : result[resultDisplayfield2Val]}
                        {/* {resultDisplayfield2 == "date" ? result["ggggggggg"] : result["yyyyyyyyyyyyyfgg"]} */}
                      </p>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearchForm;
