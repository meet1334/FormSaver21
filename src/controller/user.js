const model = require("../models/user");
const User = model.User;
const bcrypt = require("bcrypt");
const excelJS = require("exceljs");
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

// ================= ONE USER WITH ALL DATA ================= //

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
    ).populate("createdBy", { firstname: 1, lastname: 1, role: 1 });
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

// ================= ALL USERS WITH ALL DATA ================= //

const getUsers = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 4;
  let skip = (page - 1) * limit;
  try {
    const modifyFilter = [
      { isDeleted: false },
      {
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0,
        isDeleted: 0,
      },
    ];
    const users = await User.find(...modifyFilter)
      .populate("createdBy", {
        firstname: 1,
        lastname: 1,
        role: 1,
      })
      .skip(skip)
      .limit(limit);

    const count = await User.countDocuments(...modifyFilter);

    res.status(200).send({
      data: users,
      totalcount: count,
      message: "User Data fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

// ================= ALL USERS OPTIONS DATA ================= //

const getAllUsers = async (req, res) => {
  try {
    const modifyFilter = [
      { isDeleted: false },
      {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1,
        isActive: 1,
        createdBy: 1,
      },
    ];
    const user = await User.find(...modifyFilter).populate("createdBy", {
      firstname: 1,
      lastname: 1,
      role: 1,
    });

    if (user) {
      res.status(200).send({
        data: user,
        message: "Users Data fetched successfully",
      });
    } else {
      res.status(200).send({ data: user, message: "No Data Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const hash = bcrypt.hashSync(req.body.password.toString(), 10);
  const updateData = { ...req.body, password: hash };
  try {
    const user = await User.findOneAndUpdate({ _id: id }, updateData, {
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


const exportUsers = async (req, res) => {
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      {
        header: "No.",
        key: "s_no",
        width: "10",
      },
      {
        header: "First Name",
        key: "firstname",
        width: "20",
      },
      {
        header: "Middle Name",
        key: "middlename",
        width: "20",
      },
      {
        header: "Last Name",
        key: "lastname",
        width: "20",
      },
      {
        header: "Email",
        key: "email",
        width: "20",
      },
      {
        header: "Phone",
        key: "phoneNumber",
        width: "20",
      },
      {
        header: "Profession",
        key: "profession",
        width: "20",
      },
      {
        header: "City",
        key: "city",
        width: "20",
      },
    ];
    const modifyFilter = [{ isDeleted: false }];
    const UserData = await User.find(...modifyFilter);

    let counter = 1;

    UserData.forEach((user) => {
      user.s_no = counter;
      worksheet.addRow(user);
      counter++;
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = {
        bold: true,
      };
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Users.xlsx"
    );

    // workbook.xlsx.write(res);
    return workbook.xlsx.write(res).then(() => {
      res.status(200);
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  getUser,
  getUsers,
  getAllUsers,
  updateUser,
  deleteUser,
  exportUsers
};
