import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useValue } from "../../../context/ContextProvider";
import { getRooms } from "../../../actions/room";
import moment from "moment";
import RoomsActions from "./RoomsActions";

const Rooms = ({ setSelectedLink, link }) => {
  const {
    state: { rooms },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = React.useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (rooms.length === 0) getRooms(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "images",
        headerName: "Photo",
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.images[0]} variant="rounded" />
        ),
      },
      {
        field: "Price",
        headerName: "Cost",
        width: 70,
        renderCell: (params) => "$" + params.row.price,
      },
      { field: "title", headerName: "Title", width: 170 },
      { field: "description", headerName: "Description", width: 200 },
      { field: "lng", headerName: "Longitude", width: 110 },
      { field: "lat", headerName: "Latitude", width: 110 },
      {
        field: "uName",
        headerName: "Added by",
        width: 80,
        renderCell: (params) => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      { field: "_id", hide: true },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => <RoomsActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 425,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Rooms
      </Typography>
      <DataGrid
        columns={columns}
        rows={rooms}
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
      />
    </Box>
  );
};

export default Rooms;
