var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = process.env.port || 8080;

function onHttpStart() {
  console.log("listening on port:" + HTTP_PORT);
}

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/send-message", (req, res) => {
  //Note: The SMTP settings and email addresses used in this example are fictional and should be updated with your own values.
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "user@example.com",
      pass: "password",
    },
  });

  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: "hemanginipatel022@gmail.com",
    subject: "Contact Form Submission",
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error: Unable to send message");
    } else {
      console.log("Message sent: %s", info.messageId);
      res.send("Message sent");
    }
  });
});

app.listen(HTTP_PORT, onHttpStart);
