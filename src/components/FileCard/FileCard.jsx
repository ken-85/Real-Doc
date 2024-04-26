import React, { useState } from "react";
import "./FileCard.css";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineDownload } from "react-icons/ai";
import { BsFiletypeDoc } from "react-icons/bs";
import dayjs from "dayjs";

const FileCard = ({ name, date, file }) => {
  const [showThreeDot, setShowThreeDot] = useState(false);
  const showThreeDotPopUp = (e) => {
    e.stopPropagation();
    setShowThreeDot(!showThreeDot);
  };

  function addEllipsis(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const maxLength = 30;
  const truncatedText = addEllipsis(name, maxLength);

  const decodeBase64Docx = () => {
    try {
      const base64Content = file.split(",")[1];
      const decodedData = atob(base64Content); // Decoding the base64 data

      // Convert the decoded data to a Uint8Array
      const byteArray = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        byteArray[i] = decodedData.charCodeAt(i);
      }

      // Create a Blob from the Uint8Array with the MIME type application/vnd.openxmlformats-officedocument.wordprocessingml.document (DOCX)
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Generate a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a download link for the DOCX file
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${name}.docx`; // Set the desired filename

      // Trigger a click event to initiate the download
      downloadLink.click();
    } catch (error) {
      console.error("Error decoding base64 DOCX:", error);
    }
  };
  return (
    <div className="file__card">
      <div className="file__details">
        <div className="file__heading">
          <div className="icon">
            <BsFiletypeDoc size={30} />
          </div>
          <h2 className="file__name" title={name}>
            {truncatedText}
          </h2>
        </div>
        <p className="created__at">{dayjs(date).format("DD-MM-YYYY")}</p>
      </div>
      <p className="file__options">
        <HiDotsHorizontal onClick={showThreeDotPopUp} />
      </p>
      <div
        className={showThreeDot ? "three-dot-menu" : "no-show-three-dot-menu"}
      >
        <button onClick={decodeBase64Docx}>
          <AiOutlineDownload size={20} />
          Download
        </button>
      </div>
    </div>
  );
};

export default FileCard;
