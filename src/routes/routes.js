const newsRouter = require("./news");
const meRouter = require("./me");
const sitesRouter = require("./site");
const coursesRouter = require("./courses");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/Nodejs_Courses", sitesRouter);
}

module.exports = route;
