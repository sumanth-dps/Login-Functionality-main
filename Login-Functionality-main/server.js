const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

let app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/Login", upload.none(), async (req, res) => {
  console.log(req.body);
  let userDetails = await User.find().and({ email: req.body.email });

  if (userDetails.length > 0) {
    console.log(userDetails);

    if (userDetails[0].password == req.body.password) {
      let loginDetails = {
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        email: userDetails[0].email,
        profilePic: userDetails[0].profilePic,
      };

      res.json({ status: "Success", data: loginDetails });
    } else {
      res.json({ status: "Failed", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "Failed", msg: "USer doesnot exist" });
  }
});

app.post("/Signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    let user1 = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    await User.insertMany([user1]);

    res.json({ status: "Success", msg: "Successfully created User" });
  } catch (error) {
    res.json({ status: "Failed", msg: "Unable to create User", error });
  }
});

app.listen(4567, () => {
  console.log("Listening to Port 4567");
});

let connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sumanthdps:sumanth@mern2406.9fvsa.mongodb.net/Players?retryWrites=true&w=majority&appName=Mern2406"
    );
    console.log("Succesfully connected to DB");
  } catch (error) {
    console.log("Failed to create database", error);
  }
};

connectToDB();
