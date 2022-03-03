require("dotenv").config();

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000");

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");

    if (process.env.ENV?.toLowerCase() === "prod") {
      // eslint-disable-next-line global-require
      require("./migrate");
    }
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
