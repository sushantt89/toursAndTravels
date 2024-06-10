import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FormModal from "./FormModal";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  // get all users
  const { data: allUsers, loading, error } = useFetch(`${BASE_URL}/users/`);
  console.log("allUsers:", allUsers);
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

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (option) => {
    if (option === "Update") {
      setModalOpen(true); 
    setOpen(false);


    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  const columns = [
    { field: "sn", headerName: "S.N.", width: 100, resizable: false },
    { field: "name", headerName: "Name", width: 300, flex: 1, resizable: true },
    {
      field: "email",
      headerName: "Email",
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
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose} style={{ width: "1000px" }}>
            {options.map((option) => (
              <MenuItem key={option} onClick={(e) => { handleMenuItemClick(option) }}>{option}</MenuItem>
            ))}
          </Menu>
        </div>
      ),
    },
  ];

  console.log("selectedUser:", selectedUser);

  const formattedData =
    allUsers?.map((user, index) => ({
      id: user._id,
      sn: index + 1,
      name: user.username,
      email: user.email,
    })) || [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ width: "100%", padding: "50px 200px" }}>
          <h3>All Users</h3>

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

     
      <FormModal user={selectedUser} open={modalOpen} handleClose={handleModalClose} />
    </>
  );
};

export default AllUsers;
