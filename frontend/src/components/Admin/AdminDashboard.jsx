import React from "react";
import AllUsers from "./AllUsers";
import BookingDetails from "./BookingDetails";
import AllTours from "./AllTours";
import AddTour from "./AddTour";

const AdminDashboard = () => {
  const styles = {
    adminDashboard: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginLeft: "20px", // Margin on the left side
    },
    otherComponents: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  };

  return (
    <div style={styles.adminDashboard}>
      <div>
        <AddTour />
      </div>
      <div style={styles.otherComponents}>
        <AllUsers />
        <BookingDetails />
        <AllTours />
      </div>
    </div>
  );
};

export default AdminDashboard;
