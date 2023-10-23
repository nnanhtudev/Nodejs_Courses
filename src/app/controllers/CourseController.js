const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongooses");
class CourseController {
  // [GET] /course/:slug
  async show(req, res) {
    try {
      const slugCourse = await Course.findOne({ slug: req.params.slug }).exec();
      res.render("courses/show", { course: mongooseToObject(slugCourse) });
    } catch (error) {
      res.status(400).json({ error: "Course not found" });
    }
  }
  // [GET] /course/create
  create(req, res) {
    res.render("courses/create");
  }
  // [POST] /course/store
  store(req, res) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

    const course = new Course(formData);
    course
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => {});
  }
  // [GET] /course/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => res.render("courses/edit", { course: mongooseToObject(course) }))
      .catch(next);
  }
  // [PUT] /course/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
}

module.exports = new CourseController();
