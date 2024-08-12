const { fn, col, ValidationError } = require("sequelize");
const { toRupiah } = require("../helpers/number");
const { Customer, Order, Sequelize } = require("../models");

exports.home = async (req, res) => {
  try {
    // const totalOrder = await Order.sum("price");

    const totalOrder = await Order.findOne({
      raw: true,
      attributes: [
        [fn("SUM", Sequelize.literal(`"price" * "qty"`)), "totalOrder"],
      ],
    });

    console.log(totalOrder);

    const orders = await Order.findAll({
      include: {
        model: Customer,
        attributes: ["name"],
      },
    });
    // res.send(orders);
    res.render("orders", { orders, toRupiah, totalOrder });
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};

exports.newOrder = async (req, res) => {
  const { errors } = req.query;
  try {
    const customers = await Customer.findAll({ order: [["name", "asc"]] });
    res.render("newOrder", { customers, errors });
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};

exports.saveOrder = async (req, res) => {
  console.log(req.body);
  try {
    await Order.create(req.body); // otomatis manggil validasi kalau di declare
    res.redirect("/");
  } catch (error) {
    // if (error.name == "SequelizeValidationError") {
    if (error instanceof ValidationError) {
      const errors = error.errors.map((e) => e.message);
      res.redirect(`/new-order?errors=${errors}`);
    } else {
      res.send(error.message);
    }
  }
};
