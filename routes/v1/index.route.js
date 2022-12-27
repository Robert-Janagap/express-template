module.exports = (app) => {
  app.use("/", require("./app-version"));
  app.use("/image", require("./image/image.routing"));
};
