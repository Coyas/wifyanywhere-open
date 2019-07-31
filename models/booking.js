'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    pickupdate: DataTypes.DATE,
    numdias: DataTypes.INTEGER,
    flynumber: DataTypes.STRING,
    planoId: DataTypes.INTEGER,
    userId: DataTypes.UUID,
    pickuplocationId: DataTypes.INTEGER,
    returnlocationId: DataTypes.INTEGER,
    show: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.hasMany(models.Payment)
    Booking.belongsTo(models.Plan,{ foreignKey: 'planoId' })
    Booking.belongsTo(models.User)
    Booking.belongsTo(models.Place)
  };
  return Booking;
};