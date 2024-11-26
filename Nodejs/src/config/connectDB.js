const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("datlichkham2", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
//dùng async: bất đồng bộ vì hàm bất động bộ
let connectDB = async () => {
  //dùng xác thực 
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;
