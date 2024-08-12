"use strict";
const { Model } = require("sequelize");
const { convertDate } = require("../helpers/date");
const { toRupiah } = require("../helpers/number");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models = { Customer, Order }
      Order.belongsTo(models.Customer);
    }

    get formattedDate() {
      return convertDate(this.date);
    }

    get priceInRupiah() {
      return toRupiah(this.price);
    }

    get totalAmount() {
      return this.qty * this.price;
    }
  }

  Order.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product name is required",
          },
          // wajib pakai  allowNull: false,
          notNull: {
            msg: "Product name is required",
          },
        },
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Qty is required",
          },
          // wajib pakai  allowNull: false,
          notNull: {
            msg: "Qty is required",
          },
          min: {
            args: 1,
            msg: "Minimum order is 1",
          },
          isNumeric: {
            // ...
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          // wajib pakai  allowNull: false,
          notNull: {
            msg: "Price is required",
          },
          min: {
            args: 1000,
            msg: "Minimum price is 1.000",
          },
          kelipatan1000: (value) => {
            if (value % 1000 > 0) {
              throw new Error("Harus kelipatan 1000");
            }
          },
          cekQty(value) {
            if (this.qty > 1 && Number(value) == 1000) {
              throw new Error("Harga terlalu murah");
            }
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date is required",
          },
          // wajib pakai  allowNull: false,
          notNull: {
            msg: "Date is required",
          },
          isDate: {
            msg: "Invalid date",
          },
        },
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Customer is required",
          },
          // wajib pakai  allowNull: false,
          notNull: {
            msg: "Customer is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
