// CreateEvent2 - search bar resulsts mapping

// {!event && (
//     <div className="">
//       {
//         // console.log(eventList[0]);
//         eventList.map((result, index) => (
//           <div key={index}>
//             {/* Display each search result */}
            
//             <div
            
//               onClick={(e) => setEvent(result)}
//               role="button"
//               className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
//             >
//               <div  className="w-full">
//                 <h6 class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
//                   {result.serviceType }
//                 </h6>
//                 <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
//                   {result.customerId}
//                 </p>
//               </div>
//             </div>

//             {/* Add more fields as needed */}
//           </div>
//         ))
//       }
//     </div>
//   )}