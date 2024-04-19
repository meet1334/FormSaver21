const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  createdBy: [{ type: Schema.Types.ObjectId, ref: "AdminUser" }],
  firstname: { type: String, trim: true, required: true },
  middlename: { type: String, trim: true, required:true },
  lastname: { type: String, trim: true, required: true },
  title: { type: String, trim: true, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
    required: true,
  },
  profilePicture: { type: String, trim: true },
  phoneNumber: { type: String, trim: true, required: true },
  dob: { type: String, trim: true, required: true },
  district: { type: String, trim: true, required: true },
  taluka: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  pincode: { type: String, minLength: 6, required: true },
  address: { type: String, trim: true, required: false },
  profession: { type: String, trim: true, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: Date.now },
});

exports.User = mongoose.model("User", userSchema);

// moongse.schema.ObjectId