import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ files, setFiles, rejected, setRejected }) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFiles(acceptedFiles[0]);

    if (rejectedFiles?.length) {
      setRejected(rejectedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxSize: 1024 * 2000,
    onDrop,
  });

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </>
  );
};

export default DropZone;
