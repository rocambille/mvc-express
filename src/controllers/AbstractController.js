const express = require("express");

class AbstractController {
  router = express.Router();

  expose = (directory) => {
    this.router.use(express.static(directory));
  };
}

module.exports = AbstractController;
