const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.DATABASE_CONNECTION_STRING
    );
    console.log(
      "Connection established with DB ",
      connect.connection.host,
      connect.connection.name,
      
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnection;


