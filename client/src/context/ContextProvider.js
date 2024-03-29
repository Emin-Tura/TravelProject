import React, { createContext, useContext, useEffect, useRef } from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  profile: { open: false, file: null, photoURL: "" },
  images: [],
  details: { title: "", description: "", price: 0 },
  location: { lng: 0, lat: 0 },
  updatedRoom: null,
  rooms: [],
  priceFilter: 50,
  addressFilter: null,
  filteredRooms: [],
  room: null,
  users: [],
  section: 0,
};

const Context = createContext(initialState);
export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
