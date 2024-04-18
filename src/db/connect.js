const mongoose = require("mongoose");

// uri =
//   "mongodb+srv://Meet:Meetkumar07@clustermeet.8agpadt.mongodb.net/FormSaver21?retryWrites=true&w=majority&appName=ClusterMeet";

const connectDB = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectDB;
