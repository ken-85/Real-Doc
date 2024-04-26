import React, { useRef, useState, useCallback } from "react";
import "./FileInput.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setFile, setFileName } from "../../Features/File/FileSlice";
import { uploadFile } from "../../Features/File/FileActions";

const FileInput = ({ showDoc, setShowDoc }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.file.name);
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  const triggerFileSelect = () => inputRef.current.click();

  const Upload = useCallback(
    (Name, File) => {
      dispatch(uploadFile({ file: File, email: user.email, name: Name }));
    },
    [dispatch]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        // Assuming you want to upload the first selected file
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          dispatch(setFile(reader.result));
          dispatch(setFileName(file.name));
          Upload(file.name, reader.result);
        });
      }
    },
    [dispatch, Upload]
  );

  const message = useSelector((state) => state.file.message);
  console.log(message);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf", // Define the file type(s) you want to accept
  });

  return (
    <div
      className={
        !showDoc ? "input__section" : "input__section input__section-done"
      }
    >
      <div>
        <input
          type="file"
          ref={inputRef}
          name="file"
          style={{ display: "none" }}
          {...getInputProps()}
        />
      </div>
      <div className="add-upload" {...getRootProps()}>
        <svg
          fill="#504f4c"
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 487.887 487.887"
          xmlSpace="preserve"
          className="pdf__icon"
          stroke="#504f4c"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M409.046,453.807c0,2.762-2.239,5-5,5H69.414c-2.761,0-5-2.238-5-5s2.239-5,5-5h334.632 C406.808,448.807,409.046,451.045,409.046,453.807z M404.046,462.643H69.414c-2.761,0-5,2.238-5,5s2.239,5,5,5h334.632 c2.761,0,5-2.238,5-5S406.808,462.643,404.046,462.643z M124.073,17.067c-2.761,0-5,2.238-5,5v342.819c0,2.762,2.239,5,5,5 s5-2.238,5-5V22.067C129.073,19.306,126.834,17.067,124.073,17.067z M124.073,394.021c-2.761,0-5,2.238-5,5v15.588 c0,2.762,2.239,5,5,5s5-2.238,5-5v-15.588C129.073,396.259,126.834,394.021,124.073,394.021z M261.382,343.332v-36.878 c0-0.009,0-0.018,0-0.026V269.98c0-2.762,2.239-5,5-5h18.398c12.838,0,23.283,10.444,23.283,23.282 c0,6.244-2.438,12.108-6.867,16.511c-4.396,4.37-10.219,6.771-16.412,6.771c-0.046,0-0.092,0-0.138,0l-13.265-0.076v31.863 c0,2.762-2.239,5-5,5S261.382,346.094,261.382,343.332z M271.382,301.469l13.322,0.076c0.026,0,0.053,0,0.079,0 c3.533,0,6.855-1.37,9.363-3.862c2.526-2.512,3.917-5.857,3.917-9.42c0-7.324-5.958-13.282-13.283-13.282h-13.398V301.469z M316.404,343.332V269.97c0-2.762,2.239-5,5-5c22.983,0,41.681,18.698,41.681,41.681c0,22.983-18.698,41.682-41.681,41.682 C318.643,348.332,316.404,346.094,316.404,343.332z M326.404,337.938c15.102-2.403,26.681-15.518,26.681-31.286 s-11.579-28.884-26.681-31.287V337.938z M376.425,348.332c2.761,0,5-2.238,5-5v-31.67h22.511c2.761,0,5-2.238,5-5s-2.239-5-5-5 h-22.511V274.98h31.681c2.761,0,5-2.238,5-5s-2.239-5-5-5h-36.681c-2.761,0-5,2.238-5,5v73.352 C371.425,346.094,373.664,348.332,376.425,348.332z M449.271,244.319v124.675c0,2.762-2.239,5-5,5h-17.3v42.674v21.273v44.945 c0,2.762-2.239,5-5,5H43.616c-2.761,0-5-2.238-5-5v-44.933v-0.013V5c0-2.762,2.239-5,5-5h54.075h324.28c2.761,0,5,2.238,5,5v234.319 h17.3C447.032,239.319,449.271,241.558,449.271,244.319z M48.616,432.941h44.075V10H48.616V432.941z M416.971,477.887v-34.945 H97.817c-0.043,0.001-0.083,0.013-0.126,0.013H48.616v34.933H416.971z M416.971,373.994H226.115c-2.761,0-5-2.238-5-5V244.319 c0-2.762,2.239-5,5-5h190.855V10h-314.28v422.941h314.28v-16.273V373.994z M439.271,249.319H231.115v114.675h208.156V249.319z"></path>{" "}
          </g>
        </svg>
        <button className="create__button1" onClick={triggerFileSelect}>
          <AiOutlineFileAdd size={25} />
          Choose Files
        </button>
        <p>or Drop PDF&apos;s here</p>
      </div>
    </div>
  );
};

export default FileInput;
