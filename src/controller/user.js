const model = require("../models/user");
const User = model.User;

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user
      .save()
      .then((result) => {
        res.status(201).send({ message: "User data saved successfully" });
      })
      .catch((error) => {
        res
          .status(410)
          .send({ data: error, message: " User data not saved successfully" });
      });
  } catch (error) {
    console.log(error);
    res.ststus(404).send(error);
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne(
      { _id: id, isDeleted: false },
      {
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0,
        isDeleted: 0,
      }
    );
    if (user) {
      res
        .status(200)
        .send({ data: user, message: "User Data fetched successfully" });
    } else {
      res.status(200).send({ data: user, message: "No Data Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find(
      { isDeleted: false },
      {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1,
        isActive: 1,
        createdBy: 1,
      }
    );
    if (user) {
      res
        .status(200)
        .send({ data: user, message: "User Data fetched successfully" });
    } else {
      res.status(200).send({ data: user, message: "No Data Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      { isDeleted: false },
      {
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0,
        isDeleted: 0,
      }
    );
    res
      .status(200)
      .send({ data: users, message: "User Data fetched successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    })
      .where("isDeleted")
      .equals(false);

    res.status(200).send({ message: "User Data updated successfully" });
  } catch (error) {
    console.log(erorr);
    res.status(404).send(error);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send({ message: "User Data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  getAllUsers,
  updateUser,
  deleteUser,
};
