import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import formStyles from "../styles/Form.module.css";
import axios from "axios";
import Preview from "../Components/Preview";
import { useToast } from "@chakra-ui/react";

const Form = () => {
  const [showPreviewFlag, setShowPreviewFlag] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    photo: null,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const isFormValid = () => {
    if (formData.name.trim() === "") {
      toast({
        title: "Name is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (formData.age.trim() === "") {
      toast({
        title: "Age is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (formData.address.trim() === "") {
      toast({
        title: "Address is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (formData.photo === null) {
      toast({
        title: "Photo is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("file", formData.photo);

    try {
      await axios.post("http://localhost:8000/form/add-form", formDataToSend);
      setShowPreviewFlag(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      {showPreviewFlag ? (
        <Preview setShowPreviewFlag={setShowPreviewFlag} />
      ) : (
        <form className={formStyles.formContainer} onSubmit={handleSubmit}>
          <div className={formStyles.formRow}>
            <label className={formStyles.formLabel}>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formStyles.formInput}
              />
            </label>
          </div>
          <div className={formStyles.formRow}>
            <label className={formStyles.formLabel}>
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={formStyles.formInput}
              />
            </label>
          </div>
          <div className={formStyles.formRow}>
            <label className={formStyles.formLabel}>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={formStyles.formInput}
              />
            </label>
          </div>
          <div className={formStyles.formRow}>
            <label className={formStyles.formLabel}>
              Photo:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={formStyles.formInput}
              />
            </label>
          </div>
          <div className={formStyles.formRow}>
            <button
              type="submit"
              className={formStyles.formButton}
              disabled={!isFormValid()}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
