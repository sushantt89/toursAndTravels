
import React from "react";
import AllUsers from "./AllUsers";
import BookingDetails from "./BookingDetails";
import AllTours from "./AllTours";
import AddTour from "./AddTour"
const AdminDashboard = () => {
  return (
    <>
      <AllUsers />
      <BookingDetails/>
      <AllTours/>
      <AddTour/>
    </>
  );
};

export default AdminDashboard;
