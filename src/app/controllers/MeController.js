const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongooses");
class MeController {
  // [GET] me/stored/courses
  async storedCourses(req, res, next) {
    try {
      // Find All Course
      const courses = await Course.find({}).exec();
      // Count Course Deleted
      const deleteCount = await Course.countDocumentsDeleted({ deletedAt: { $exists: true } });
      res.render("me/stored-courses", { deleteCount, courses: multipleMongooseToObject(courses) });
    } catch {
      res.status(400).json({ next: "Course not found" });
    }
  }
  // [GET] me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({ deletedAt: { $exists: true } })
      .then((courses) => {
        res.render("me/trash-courses", { courses: multipleMongooseToObject(courses) });
      })
      .catch(next);
  }
}

module.exports = new MeController();
