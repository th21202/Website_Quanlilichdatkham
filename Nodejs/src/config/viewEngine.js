import express from "express";

let configViewEngine = (app) => {
  //clinet có thể truy cập vào
  app.use(express.static("./src/public"));
  //cho phép dùng được các cau lệnh điều kiện
  app.set("view engine", "ejs");
  
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
