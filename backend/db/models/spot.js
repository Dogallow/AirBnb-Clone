'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.Review, 
        {foreignKey: 'spotId',
        onDelete: 'CASCADE'
        }
      )

      Spot.belongsTo(
        models.User,
        {as: 'Owner',
        foreignKey: 'ownerId'}
      )

      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE'
        }       
        )

      
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty:{
          args: true,
          msg: "Street Address is required"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "City is required"
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "State is required"
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Country is required"
        }
      }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Latitude is required"
        },
        isDecimal: {
          args: true,
          msg: "Latitude is not valid"
        },
        customValidate(value){
          if(typeof value !== 'number'){
            throw new Error('Latitude is not valid')
          }
        }
        
    }
  },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Longitude is required"
        },
        isDecimal: {
          args: true,
          msg: "Longitude is not valid"
        },
        customValidate(value){
          if (typeof value !== 'number'){
            throw new Error('Longitude is not valid')
          }
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
          args: [1,50],
          msg: "Name must be less than 50 characters"
        },
        notEmpty:{
          args:true,
          msg: "Name is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price per day is required"
        },
        isDecimal:{
          args: true,
          msg: "Price must be a number"
        },
        customValidate(value) {
          if (typeof value !== 'number') {
            throw new Error("Price must be a number")
          }
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
