exports.toRupiah = (number) => {
  return Number(number).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
