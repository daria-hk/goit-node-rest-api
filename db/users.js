import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import { emailRgxp, passRgxp } from "../constants/auth.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: passRgxp,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: emailRgxp,
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  avatarURL: { type: DataTypes.STRING, allowNull: true },
});

User.sync();

export default User;
