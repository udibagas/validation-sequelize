exports.convertDate = (date) => {
  return date.toLocaleString("id-ID", {
    dateStyle: "long",
  });
};

exports.convertTime = (date) => {
  return date.toLocaleString("id-ID", {
    timeStyle: "full",
  });
};
