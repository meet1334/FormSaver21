const model = require("../models/role");
const Role = model.Role;
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connectDB = require("../db/connect");
const { RoleEnum, RoleSlugEnum, RoleTypeEnum } = require("../enum/role");

//=============  LISTEN SERVER =============================

const runSeed = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    // =============  SEED DATA =============================

    const RoleData = [
      {
        type: RoleTypeEnum.Admin,
        slug: RoleSlugEnum.Admin,
        name: RoleEnum.Admin,
      },
      {
        type: RoleTypeEnum.Staff,
        slug: RoleSlugEnum.Staff,
        name: RoleEnum.Staff,
      },
      {
        type: RoleTypeEnum.User,
        slug: RoleSlugEnum.User,
        name: RoleEnum.User,
      },
    ];

    const seedDB = async () => {
      try {
        await Role.deleteMany({});
        await Role.insertMany(RoleData);
        console.log("Database seeding completed successfully.");
      } catch (error) {
        console.error("Error seeding database:", error);
      }
      mongoose.connection.close();
    };

    seedDB()
      .then(() => {
        console.log("Seeding completed successfully ...");
      })
      .catch((error) => {
        console.error("Error seeding database:", error);
      });
  } catch (error) {
    console.log("error:--------", error);
  }
};

runSeed();
