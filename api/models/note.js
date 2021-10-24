'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Note extends Sequelize.Model {}
  Note.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date is required'
        },
        notEmpty: {
          msg: 'Please provide a date'
        }
      }
    },
    diet: {
      type: Sequelize.TEXT,
    },
    mood: {
      type: Sequelize.TEXT,
    },
    symptoms: {
      type: Sequelize.TEXT,
    },
    exercise: {
      type: Sequelize.TEXT,
    }
  }, { sequelize });

  return Note;
};
