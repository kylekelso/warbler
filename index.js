const express = require("express"),
  bodyParser = require("body-parser"),
  sessions = require("client-sessions"),
  compression = require("compression");

const keys = require("./config/keys"),
  authRoutes = require("./routes/authentication"),
  postRoutes = require("./routes/post"),
  userRoutes = require("./routes/user"),
  errorHandlers = require("./handlers/error"),
  { loadSession } = require("./middleware/authentication");
const app = express();
app.use(bodyParser.json());
app.use(
  sessions({
    cookieName: "session",
    secret: keys.SESSION_SECRET_KEY,
    duration: keys.SESSION_DURATION
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loadSession);
app.use(compression());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.use(errorHandlers);
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function() {
  console.log(`Server starting on ${PORT}`);
});
