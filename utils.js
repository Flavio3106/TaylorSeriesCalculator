const serverData = {
  port: process.env.PORT || 4000,
  host: "127.0.0.1",
};

const views = {
  index: "index",
  calculator: "calculator",
  notFound: "404",
};

const routes = {
  index: "/",
  calculator: "/calculator",
};

module.exports = { serverData, views, routes };
