const cron = require("node-cron");
const User = require("../models/User");
const transporter = require("../config/email");

function birthdayScheduler() {
  cron.schedule("0 7 * * *", async () => {
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    const users = await User.find();

    users.forEach((user) => {
      const dob = new Date(user.dateOfBirth);
      if (dob.getDate() === day && dob.getMonth() === month) {
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Happy Birthday! 🎉",
          html: `<h1>Happy Birthday, ${user.username}!</h1><p>We at [Your Company] wish you an amazing day filled with joy and success!</p>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.error(err);
          else console.log("Email sent: " + info.response);
        });
      }
    });
  });
}

module.exports = birthdayScheduler;
