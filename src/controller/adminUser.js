const model = require("../models/adminUser");
const path = require("path");
const AdminUser = model.AdminUser;
const bcrypt = require("bcrypt");

// ================= ALL ADMIN USERS WITH ALL DATA ================= //

const getAdminUsers = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 4;
  let skip = (page - 1) * limit;
  try {
    const modifyFilter = [
      { isDeleted: false },
      {
        username: 0,
        password: 0,
        token: 0,
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0,
        isDeleted: 0,
      },
    ];
    const users = await AdminUser.find(...modifyFilter)
      .skip(skip)
      .limit(limit);
    const count = await AdminUser.countDocuments(...modifyFilter);

    res.status(200).send({
      data: users,
      totalcount: count,
      message: "AdminUsers Data fetched successfully",
    });
  } catch {
    res.status(404).send(error);
    console.log(error);
  }
};

// ================= ALL ADMIN USERS OPTION DATA ================= //

const getAllAdminUsers = async (req, res) => {
  try {
    const users = await AdminUser.find(
      { isDeleted: false },
      {
        _id: 1,
        firstname: 1,
        lastname: 1,
        role: 1,
        email: 1,
        isActive: 1,
      }
    );
    res
      .status(200)
      .send({ data: users, message: "AdminUsers Data fetched successfully" });
  } catch {
    res.status(404).send(error);
    console.log(error);
  }
};

// ================= ONE ADMIN USER WITH ALL DATA ================= //

const getAdminUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await AdminUser.findOne(
      { _id: id, isDeleted: false },
      {
        password: 0,
        token: 0,
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0,
        isDeleted: 0,
      }
    );
    if (user) {
      res
        .status(200)
        .send({ data: user, message: "AdminUser Data fetched successfully" });
    } else {
      res.status(200).send({ data: user, message: "No Data Found" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
const updateAdminUser = async (req, res) => {
  const id = req.params.id;
  const hash = bcrypt.hashSync(req.body.password.toString(), 10);
  const updateData = { ...req.body, password: hash };
  try {
    await AdminUser.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    })
      .where("isDeleted")
      .equals(false);
    res.status(200).send({ message: "AdminUser Data updated successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

const deleteAdminUser = async (req, res) => {
  const id = req.params.id;
  try {
    await AdminUser.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send({ message: "AdminUser Data deleted successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

module.exports = {
  getAdminUsers,
  getAdminUser,
  getAllAdminUsers,
  updateAdminUser,
  deleteAdminUser,
};
