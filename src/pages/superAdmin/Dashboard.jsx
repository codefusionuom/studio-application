import React,{useEffect} from "react";
import PieChar from "../../components/graphs/PieChart.jsx";
import PaymentListTable from "../../components/tables/PaymentListTable.js";
import { CardComp } from "./component/CardComp.jsx";
import BarGraph from "../../components/graphs/BarGraph.jsx";

function SuperAdminDashboard() {

  return (
    <div>
      <CardComp />
      <div className="flex">
        <BarGraph />
        <PieChar />
      </div>
      <PaymentListTable />
    </div>
  );
}

export default SuperAdminDashboard;
