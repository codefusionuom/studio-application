import React from "react";
import PieChar from "../../components/graphs/PieChart.jsx";
import PaymentListTable from "../../components/tables/PaymentListTable.js";
import { CardComp } from "./component/CardComp.jsx";
import BarGraph from "../../components/graphs/BarGraph.jsx";
import EventGraph from "./component/EventGraph.js";
import BarGraphPayment from "../../components/graphs/BarGraph copy.jsx";

function SuperAdminDashboard() {
  return (
    <div>
      <CardComp />
      <div className="flex">
        <BarGraph />
        <BarGraphPayment />

        <PieChar />
      </div>
      <EventGraph />
      <PaymentListTable />
    </div>
  );
}

export default SuperAdminDashboard;
