import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../global/Layout'
import { customerList } from '../../global/Layout/data'
import socketIOClient from "socket.io-client";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addCustomerRequest } from '../../features/customerManager/customerRequest';

function CustomerManager() {
  const dispatch = useDispatch();
  // const socket = socketIOClient("http://localhost:5000");
  const [socket, setSocket] = useState(null);
  // useEffect(() => {
  //   console.log("useeffect socket");
  //   socket.on("customerRequest", (newRequest) => {
  //     console.log(newRequest, "socket message");
  //     //setRequests([newRequest,...requests]);
  //     dispatch(addCustomerRequest());
  //   });
  // }, [socket]);

  useEffect(() => {
    const newSocket = socketIOClient("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []); // This empty dependency array ensures the socket is set up once on mount

  useEffect(() => {
    if (socket) {
      console.log("useeffect socket");
      socket.on("customerRequest", (newRequest) => {
        console.log(newRequest, "socket message");
        dispatch(addCustomerRequest());
      });

      return () => {
        socket.off("customerRequest");
      };
    }
  }, [socket, dispatch]);

  return ( 
    // section should be your topic list of side bar in /global/data.js
  <Layout sections={customerList}>
    <Outlet />
   
  </Layout >

  )
}

export default CustomerManager
