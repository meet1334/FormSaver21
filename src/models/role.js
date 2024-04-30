const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
  type: { type: "string", trim: true, required: true },
  slug: { type: "string", trim: true, required: true },
  name: { type: "string", trim: true, required: true },
});

exports.Role = mongoose.model("Role", roleSchema);
