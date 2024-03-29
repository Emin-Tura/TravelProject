import React, { useCallback } from "react";
import { Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ProgressList from "./progressList/ProgressList";
import ImagesList from "./ImagesList";

const AddImages = () => {
  const [files, setFiles] = React.useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <>
      <Paper
        sx={{
          cursor: "pointer",
          backgroundColor: "#fafafa",
          color: "#bdbdbd",
          border: "1px dashed #ccc",
          "&:hover": { border: "1px solid #ccc" },
        }}
      >
        <div style={{ padding: "16px" }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "green" }}>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          <em>(images with *.jpeg,*.png,*.jpg extension will be accepted)</em>
        </div>
      </Paper>
      <ProgressList {...{ files }} />
      <ImagesList />
    </>
  );
};

export default AddImages;
