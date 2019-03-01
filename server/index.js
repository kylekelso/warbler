const express = require("express"),
  bodyParser = require("body-parser"),
  sessions = require("client-sessions"),
  csurf = require("csurf");

const keys = require("./config/keys"),
  authRoutes = require("./routes/authentication"),
  postRoutes = require("./routes/post"),
  userRoutes = require("./routes/user"),
  errorHandlers = require("./handlers/error"),
  {
    checkSessionExists,
    verifySession,
    loadSession
  } = require("./middleware/authentication");
const app = express();
app.use(
  sessions({
    cookieName: "session",
    secret: keys.SESSION_SECRET_KEY,
    duration: keys.SESSION_DURATION
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loadSession);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/:user_id", checkSessionExists, verifySession, postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`Server starting on ${PORT}`);
});
