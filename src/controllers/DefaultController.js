const AbstractController = require("./AbstractController");

class DefaultController extends AbstractController {
  constructor() {
    super();

    this.expose("public");
  }
}

module.exports = DefaultController;
