import React,{useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import PieChar from "../../components/graphs/PieChart.jsx";
import PaymentListTable from "../../components/tables/PaymentListTable.js";
import { CardComp } from "./component/CardComp.jsx";
import BarGraph from "../../components/graphs/BarGraph.jsx";
import PaymentList from "../customerManager/PaymentsList.js";

function SuperAdminDashboard({auth}) {
  const { loading, admin } = useSelector((state) => state.auth);

  return (
    <div>
      <CardComp />
      <div className="flex">
        <BarGraph />
        <PieChar />
      </div>
      <div className="mt-9"></div>
      <PaymentList />
    </div>
  );
}

export default SuperAdminDashboard;
