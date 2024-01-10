const express = require("express");
const multer = require("multer");
const { FormModel } = require("../model/form.model");
const path = require("path");

const formRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
}); // Using memory storage for demo purposes, configure disk storage in production
const upload = multer({ storage: storage });

formRouter.get("/get-form", async (req, res) => {
  try {
    const getFormData = await FormModel.find();
    res.status(201).send({ allData: getFormData });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

formRouter.post("/add-form", upload.single("file"), async (req, res) => {
  const { name, age, address } = req.body;
  try {
    const newFormData = new FormModel({
      name,
      age,
      address,
      photo: req.file.filename,
    });

    await newFormData.save();

    res.status(200).send({ formData: newFormData });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  formRouter,
};
