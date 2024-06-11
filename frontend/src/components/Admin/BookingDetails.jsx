import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FormModalBooking from "./FormModalBooking";

const BookingDetails = () => {
  const { user } = useContext(AuthContext);
  // get all users
  const {
    data: allBookings,
    loading,
    error,
  } = useFetch(`${BASE_URL}/booking/`);
  console.log("allBookings:", allBookings);
  const options = ["Update", "Delete"];
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const handleEdit = (event, user) => {
    
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
    setOpen(true);

  };
  console.log("selectedUser:", selectedUser);

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (option) => {
    setOpen(false);
    if (option === "Update") {
      setModalOpen(true);
      setOpen(false);
    }
    if (option === "Delete") {
      const id = selectedUser.id;
      console.log("id-mero:", id);

      try {
        const bodyObject = {
          id: selectedUser.id,
        };
        const res = await fetch(`${BASE_URL}/booking/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyObject),
        });
        const result = await res.json();
        if (!res.ok) {
          return alert(result.message);
        }
        alert(`successfully deleted ${selectedUser.name}`);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  const columns = [
    { field: "sn", headerName: "S.N.", width: 100, resizable: false },
    { field: "name", headerName: "Name", width: 300, flex: 3, resizable: true },
    {
      field: "email",
      headerName: "Email",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "destination",
      headerName: "Destination",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "guestSize",
      headerName: "Number of Guests",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "bookedAt",
      headerName: "Booked Date",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "bookingId",
      headerName: "booking ID",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      flex: 1,
      resizable: false,
      renderCell: (params) => (
        <div>
          <IconButton onClick={(e) => handleEdit(e, params.row)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
          <div></div>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            style={{ width: "1000px" }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={(e) => {
                  handleMenuItemClick(option);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ),
    },
  ];

  console.log("selectedUser:", selectedUser);

  const formattedData =
    allBookings?.map((booking, index) => ({
      id: booking._id,
      sn: index + 1,
      name: booking.fullName,
      email: booking.userEmail,
      guestSize: booking.guestSize,
      phone: booking.phone,
      bookedAt: new Date(booking.bookedAt).toLocaleString(), // Format the timestamp
      destination: booking.bookingDestination,
      bookingId: booking.bookingId,
    })) || [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ width: "100%", padding: "50px 200px" }}>
          <h3>Booking Details</h3>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <DataGrid
              autoHeight
              rows={formattedData}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
            />
          </div>
        </div>
      )}

      <FormModalBooking
        user={selectedUser}
        open={modalOpen}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default BookingDetails;
