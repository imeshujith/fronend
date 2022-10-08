import { useEffect } from "react";

export interface SingleFileUploadProps {
  file: File;
}

export function SingleFileUpload({ file }: SingleFileUploadProps) {
  useEffect(() => {
    const upload = async () => {
      const url = await uploadFile(file);
    };
    upload();
  }, []);
  return <></>;
}

const uploadFile = async (file: File) => {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = () => {};
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
      }
    };
  });
};
