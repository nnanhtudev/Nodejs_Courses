const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongooses");
class MeController {
  // [GET] me/stored/courses
  async storedCourses(req, res) {
    try {
      //Call documentation for DB
      const courses = await Course.find({}).exec();
      // render views for util multipleMongooseToObject
      res.render("me/stored-courses", { courses: multipleMongooseToObject(courses) }); // Render the "home" template with the plain objects
    } catch (err) {
      res.status(400).json({ error: "Course not found" });
    }
  }
  // [GET] me/trash/courses
  trashCourses(req, res, next) {
    // Course.findDeleted()
    //   .then((courses) => {
    //     res.render("me/trash-courses", { courses: multipleMongooseToObject(courses) });
    //   })
    //   .catch(next);
    Course.findDeleted({})
      .then((courses) => {
        console.log(courses);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = new MeController();
