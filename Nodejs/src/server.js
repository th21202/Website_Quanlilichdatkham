import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();
// app.use(
//   cors({
//     origin: true,
//     optionsSuccessStatus: 200,
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );


// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Trang web bạn muốn cho phép kết nối
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Yêu cầu các phương pháp bạn muốn cho phép
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Yêu cầu tiêu đề bạn muốn cho phép
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Đặt thành đúng nếu bạn cần trang web bao gồm cookie trong các yêu cầu được gửi
  // đến API (ví dụ: trong trường hợp bạn sử dụng phiên)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Chuyển sang lớp phần mềm trung gian tiếp theo
  next();
});

//config app
//thiết lập middleware để xử lý dữ liệu đầu vào từ client, với giới hạn kích thước là 50MB cho cả JSON và dữ liệu biểu mẫu.
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);
//trước khi app chạy là đã kết nối đến DB trước
//ứng dụng có thể tương tác với cơ sở dữ liệu trước khi bắt đầu xử lý các yêu cầu từ client.
connectDB();

let port = process.env.PORT || 8081;

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is running on the port : " + port);
});



















