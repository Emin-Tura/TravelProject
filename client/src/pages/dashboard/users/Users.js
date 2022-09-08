import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useValue } from "../../../context/ContextProvider";
import { getUsers } from "../../../actions/user";
import moment from "moment";
import UserActions from "./UserActions";

const Users = ({ setSelectedLink, link }) => {
  const {
    state: { users },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = React.useState(5);
  const [rowId, setRowId] = React.useState(null);

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
      },
      { field: "name", headerName: "Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "role",
        headerName: "Role",
        width: 100,
        type: "singleSelect",
        valueOptions: ["basic", "editor", "admin"],
        editable: true,
      },
      {
        field: "active",
        headerName: "Active",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      { field: "_id", headerName: "id", width: 220 },
      {
        filed: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <UserActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Users
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "primaryDark.800" : "grey.100",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "primaryDark.600" : "grey.200",
            },
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default Users;
