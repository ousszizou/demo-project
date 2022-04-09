const app = require("./app");

const db = require("./models");
const Role = db.role;

// Connecting to database (mongodb)
db.mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.error("Connection error", err);
      process.exit();
    } else {
      console.log("Connection to database successful");
      initial();
    } 
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'student' to roles collection");
      });

      new Role({
        name: "teacher",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'teacher' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
