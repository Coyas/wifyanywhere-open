'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    email:  {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:true
    },
    password:  {
        type: DataTypes.STRING(70),
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING(150)
    },
    localId: {
        type: DataTypes.BOOLEAN
    },
    facebookId: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    googleId: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    street_adress: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    biling_adress: {
      type: DataTypes.STRING
    },
    zip_code: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.SMALLINT
    },
    access: {
        type: DataTypes.SMALLINT
    },
    accessToken:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    confirme:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    } 
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Booking)
  };
  return User;
};