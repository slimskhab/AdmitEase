
const Counter = require("../models/counterModel")
const Student = require("../models/StudentModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const addStudent = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "autovalStudent" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const student = new Student({
      id: counter.seq,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      interests: req.body.interests,

    });

    await student.save();

    res.status(201).json({
      status: "success",
      message: "Added Student",
      student: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}


const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });



    if (!student) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }


    const passwordMatch = await bcrypt.compare(password, student.password);

    const token = jwt.sign(
      { id: student.id, role: "student",username:student.firstName },
      process.env.JWT_SECRET
  );

    if (passwordMatch) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        student: student,
        token:token,
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }

}


module.exports = {addStudent,loginStudent }