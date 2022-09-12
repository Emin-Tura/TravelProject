import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { deleteRoom } from "../../../actions/room";
import { useValue } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const RoomsActions = ({ params }) => {
  const { _id, lng, lat, price, title, description, images, uid } = params.row;
  const {
    dispatch,
    state: { currentUser },
  } = useValue();

  const navigate = useNavigate();
  const handleEdit = () => {
    dispatch({ type: "UPDATE_LOCATION", payload: { lng, lat } });
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { price, title, description },
    });
    dispatch({ type: "UPDATE_IMAGES", payload: images });
    dispatch({ type: "UPDATE_UPDATED_ROOM", payload: { _id, uid } });
    dispatch({ type: "UPDATE_SECTION", payload: 2 });
    navigate("/");
  };

  return (
    <Box>
      <Tooltip title="View room details">
        <IconButton
          onClick={() => dispatch({ type: "UPDATE_ROOM", payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this room">
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this room">
        <IconButton
          onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RoomsActions;
