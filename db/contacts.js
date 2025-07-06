import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import User from "./users.js";

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

Contact.sync({ alter: true });

export default Contact;
