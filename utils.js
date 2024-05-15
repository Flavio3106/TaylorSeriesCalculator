const serverData = {
  port: process.env.PORT || 4000,
  host: "127.0.0.1",
};

const views = {
  index: "index",
  notFound: "404",
};

const routes = {
  index: "/",
};

module.exports = { serverData, views, routes };
