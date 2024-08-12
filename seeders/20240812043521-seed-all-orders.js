"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = require("../data/orders.json").map((el) => {
      return { ...el, createdAt: new Date(), updatedAt: new Date() };
    });

    await queryInterface.bulkInsert("Orders", orders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
