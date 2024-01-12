import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudDownloadOutline, IoCloudUploadOutline } from "react-icons/io5";

const DropZone = ({ files, setFiles, rejected, setRejected }) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFiles(acceptedFiles[0]);

    if (rejectedFiles?.length) {
      setRejected(rejectedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 1024 * 2000,
    onDrop,
  });

  return (
    <>
      <div
        className="rounded border-2 p-10 border-dotted border-green-500"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <IoCloudDownloadOutline className="text-4xl mx-auto" />
            <p className="text-center">
             .............. Drag the file here inside the box.................
            </p>
          </>
        ) : (
          <>
            <IoCloudUploadOutline className="text-4xl mx-auto" />
            <p className="text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default DropZone;
