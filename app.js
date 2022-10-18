var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fetch = require("node-fetch");
const qs = require("qs");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/api/kkbox/token", async (req, res) => {
  const data = await getLoginKKBOX();

  return res.json(data);
});

async function getLoginKKBOX() {
  const request = {
    grant_type: "client_credentials",
    client_id: "5c3def3666acf30a8151b725576dcf7d",
    client_secret: "54bd2719c92ca2f67efff243e116dba2",
  };
  const response = await fetch("https://account.kkbox.com/oauth2/token", {
    method: "post",
    body: qs.stringify(request),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.json();
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
