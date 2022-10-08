import React, { useCallback, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { SingleFileUpload } from "./SingleFileUpload";

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

export function MultipleFileUpload() {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mapFiles = acceptedFiles.map((file) => ({ file, errors: [] }));
      setFiles((currentFiles) => [
        ...currentFiles,
        ...mapFiles,
        ...rejectedFiles,
      ]);
    },
    []
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {JSON.stringify(files)}
      </div>
      {files.map((fileWrapper) => (
        <SingleFileUpload file={fileWrapper.file} />
      ))}
    </>
  );
}
