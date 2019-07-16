'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    data: DataTypes.DATE,
    valor: DataTypes.DOUBLE,
    bookingId: DataTypes.INTEGER,
    tipo: DataTypes.SMALLINT
  }, {});
  Payment.associate = function(models) {
    // associations can be defined here
    Payment.belongsTo(models.Booking)
  };
  return Payment;
};