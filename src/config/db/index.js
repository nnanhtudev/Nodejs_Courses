const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog_education_dev").then(() => console.log("Connected!"));
  } catch (error) {
    console.log("Connect failed: " + error);
  }
};

module.exports = { connect };
