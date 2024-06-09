import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const AllUsers = () => {
  //get all users
  const allUsers = useFetch(`${BASE_URL}`);

  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];
  const columns = [
    { field: "sn", headerName: "S.N.", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
  ];

  return (
    <div style={{ width: "100%", padding: "50px 200px" }}>
      <h3>All Users</h3>

      <DataGrid autoHeight={true} rows={rows} columns={columns} />
    </div>
  );
};

export default AllUsers;
