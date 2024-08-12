"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = require("../data/customers.json").map((el) => {
      return { ...el, createdAt: new Date(), updatedAt: new Date() };
    });

    await queryInterface.bulkInsert("Customers", customers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
