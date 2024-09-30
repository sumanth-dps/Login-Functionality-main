import React from "react";
import { useSelector } from "react-redux";
import TopNavigation from "./TopNavigation";

function Dashboard() {
  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });
  return (
    <div>
      <TopNavigation></TopNavigation>
      <h1>Dashboard</h1>
      <h1>
        {storeObj.loginDetails.firstName} {storeObj.loginDetails.lastName}
      </h1>
      <img
        src={`http://localhost:4567/${storeObj.loginDetails.profilePic}`}
      ></img>
    </div>
  );
}

export default Dashboard;
