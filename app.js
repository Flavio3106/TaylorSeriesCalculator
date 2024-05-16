const { serverData, views, routes } = require("./utils");
const express = require("express");
const path = require("path");
const app = express();

//Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
//Static file
app.use(express.static(path.join(__dirname, "src")));

//route "/"
app.get(routes.index, (req, res) => {
  res.status(200).render(views.index);
});

//route "/calculator"
app.get(routes.calculator, (req, res) => {
  res.status(200).render(views.calculator);
});

//when the route is not found
app.all("*", (req, res) => {
  res.status(404).render(views.notFound);
});

app.listen(serverData.port, () =>
  console.log(`App running on port: ${serverData.port}/`)
);
