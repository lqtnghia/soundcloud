"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./theme.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { sendRequestFile } from "@/utils/api";
import { useSession } from "next-auth/react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

function InputFileUpload() {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
      }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}

const Step1 = () => {
  const { data: session } = useSession();
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const audio = acceptedFiles[0];
        const formData = new FormData();
        formData.append("fileUpload", audio);
        const chills = await sendRequestFile<IBackendRes<ITrackTop[]>>({
          url: "http://localhost:8000/api/v1/files/upload",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${session?.access_token}`
          }
        });
        console.log(">>> check audio: ", session?.access_token);
        console.log(">>> check audio: ", audio);
      }
    },
    [session]
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      audio: [".mp3", ".m4a", ".wav"]
    },
    maxSize: 10 * 1024 * 1024
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Click hoặc Drag/Drop để upload file track!</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Step1;
