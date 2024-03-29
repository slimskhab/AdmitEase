
const Counter = require("../models/counterModel")
const Teacher = require("../models/TeacherModel")
const bcrypt = require("bcrypt")
const addTeacher = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const teacher = new Teacher({
      id: counter.seq,

      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      profilePic: req.body.profilePic,

    });

    await teacher.save();

    res.status(201).json({
      status: "success",
      message: "Added Teacher",
      teacher: teacher
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });



    if (!teacher) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }


    const passwordMatch = await bcrypt.compare(password, teacher.password);

    if (passwordMatch) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        teacher: teacher,
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


module.exports = {addTeacher,loginTeacher }