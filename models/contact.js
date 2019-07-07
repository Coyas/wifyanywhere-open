'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    fax: DataTypes.STRING,
    zip_code: DataTypes.STRING
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};