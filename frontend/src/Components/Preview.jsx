import axios from "axios";
import React, { memo, useEffect, useRef, useState } from "react";
import previewStyles from "../styles/Preview.module.css";
import jsPDF from "jspdf";


const Preview = ({ setShowPreviewFlag }) => {
  const [formDataList, setFormDataList] = useState([]);
  const pdfRef = useRef();
  const handleDownloadPdf = () => {
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    // Access the first element in the formDataList array (if available)
    const formData = formDataList[0];

    if (formData) {
      loadImage(`http://localhost:8000/Images/` + formData.photo)
        .then((img) => {
          console.log("Image loaded successfully:", img);
          createPdf(img, formData);
        })
        .catch((err) => console.error("Error loading image:", err));
    }
  };

  const createPdf = (img, formData) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = pdf.internal.pageSize.getHeight();

    // Adjust these values to control the image position and size
    const imgX = 10;
    const imgY = 10;
    const imgWidth = pdfWidth - 20; // Use the entire width with some margin
    const imgHeight = (img.height * imgWidth) / img.width;

    pdf.addImage(img, "PNG", imgX, imgY, imgWidth, imgHeight);

    // Adjust these values to control the position of the text
    const textX = 10;
    const textY = imgY + imgHeight + 10;

    pdf.text(`Name: ${formData.name}`, textX, textY);
    pdf.text(`Age: ${formData.age}`, textX, textY + 10);
    pdf.text(`Address: ${formData.address}`, textX, textY + 20);

    pdf.save("preview.pdf");
  };

  const handleCancel = () => {
    setShowPreviewFlag(false);
  };

  useEffect(() => {
    axios
      .get("https://kryzen-backend-sccv.onrender.com/form/get-form")
      .then((res) => {
        const newFormDataList = res.data.allData;

        setFormDataList([newFormDataList[newFormDataList.length - 1]]);
      })
      .catch((err) => console.log(err));
  }, []);
  // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div>
      <div className={previewStyles.buttonDiv}>
        <button
          onClick={handleDownloadPdf}
          className={previewStyles.downloadButton}
        >
          Download as PDF
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>

      <div className={previewStyles.container} ref={pdfRef}>
        {formDataList.map((formData) => (
          <div key={formData._id} id="preview-container">
            <img
              src={`http://localhost:8000/Images/` + formData.photo}
              alt=""
            />
            <p>Name: {formData.name}</p>
            <p>Age: {formData.age}</p>
            <p>Address: {formData.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Preview);
