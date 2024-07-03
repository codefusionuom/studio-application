import React from "react";
import Layout from "../../global/Layout";
import { Outlet, Route, Routes } from "react-router-dom";
import { stockManagerList } from "../../global/Layout/data";

function index() {
  return (
    <>
      <Layout sections={stockManagerList}>
        <Outlet />
      </Layout>
    </>
  );
}

export default index;
