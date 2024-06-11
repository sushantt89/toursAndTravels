
import React from "react";
import AllUsers from "./AllUsers";
import BookingDetails from "./BookingDetails";
import AllTours from "./AllTours";
const AdminDashboard = () => {
  return (
    <>
      <AllUsers />
      <BookingDetails/>
      <AllTours/>
    </>
  );
};

export default AdminDashboard;
