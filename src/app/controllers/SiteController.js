const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongooses");
class SiteController {
  // [GET]
  async home(req, res) {
    try {
      //Call documentation for DB
      const courses = await Course.find({}).exec();
      // render views for util multipleMongooseToObject
      res.render("home", { courses: multipleMongooseToObject(courses) }); // Render the "home" template with the plain objects
    } catch (err) {
      res.status(400).json({ error: "Course not found" });
    }
  }
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
