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
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

    const course = new Course(req.body);
    course
      .save()
      .then(() => {
        res.redirect("/me/stored/courses");
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
  // [DELETE] /course/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /course/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [PATCH] /course/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new CourseController();
