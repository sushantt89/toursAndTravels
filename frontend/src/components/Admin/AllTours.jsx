import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FormModalBooking from "./FormModalBooking";
import FormModalTours from "./FormModalTours";

const AllTours = () => {
  const { user } = useContext(AuthContext);
  // get all tours
  const { data: allTours, loading, error } = useFetch(`${BASE_URL}/tours/`);
  console.log("allTours:", allTours);
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
        const res = await fetch(`${BASE_URL}/tours/${id}`, {
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
        alert(`successfully deleted ${selectedUser.title}`);
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
    {
      field: "title",
      headerName: "Tittle",
      width: 300,
      flex: 3,
      resizable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
      flex: 3,
      resizable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "distance",
      headerName: "Distance",
      width: 400,
      flex: 3,
      resizable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 400,
      flex: 3,
      resizable: true,
    },

    {
        field: "featured",
        headerName: "Featured",
        width: 400,
        flex: 3,
        resizable: true,
        renderCell: (params) => {
          return params.row.featured ? (
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: "#63E6BE" }}
            />
          ) : (
            <FontAwesomeIcon icon={faTimes} /> // Corrected icon name
          );
        },
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
    allTours?.map((tour, index) => ({
      id: tour._id,
      sn: index + 1,
      address: tour.address,
      city: tour.city,
      desc: tour.desc,
      distance: tour.distance,
      price: tour.price,
      title: tour.title,
    })) || [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ width: "100%", padding: "50px 200px" }}>
          <h3>All Tours</h3>

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

      <FormModalTours
        user={selectedUser}
        open={modalOpen}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default AllTours;
