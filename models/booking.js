'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
  },
    pickupdate: DataTypes.DATE,
    numdias: DataTypes.INTEGER,
    flynumber: DataTypes.STRING,
    planoId: DataTypes.INTEGER,
    userId: DataTypes.UUID,
    pickuplocationId: DataTypes.INTEGER,
    returnlocationId: DataTypes.INTEGER,
    showup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.hasMany(models.Payment)
    Booking.belongsTo(models.Plan)
    Booking.belongsTo(models.User)
    Booking.belongsTo(models.Place)

    // Booking.hasMany(models.Payment)
    // Booking.belongsTo(models.Plan,{ foreignKey: 'planoId' })
    // Booking.belongsTo(models.User, { foreignKey: 'userId' })
    // Booking.belongsTo(models.Place, { foreignKey: 'pickuplocationId'})
    // Booking.belongsTo(models.Place, { foreignKey: 'returnlocationId'})
  };
  return Booking;
};

// pickuplocationId: {
//   type: DataTypes.INTEGER,
//   references: {
//     model: 'Places',
//     key: 'id'
//   },
//   onUpdate: 'CASCADE',
//   onDelete: 'SET NULL'
// },
// returnlocationId: {
//   type: DataTypes.INTEGER,
//   references: {
//     model: 'Places',
//     key: 'id'
//   },
//   onUpdate: 'CASCADE',
//   onDelete: 'SET NULL'
// },