'use strict';

const bcrypt = require('bcryptjs');
const { Validator } = require('sequelize');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      const { firstName, lastName, id, username, email } = this; // context will be the User instance
      return { id,firstName, lastName, username, email };
    }

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    static associate(models) {
      // define association here
      User.hasMany(
        models.Booking,
        {foreignKey: 'userId',
        onDelete: 'CASCADE'
        },
      )

      User.hasMany(
        models.Spot,
        
        {
          as: 'Owner',
          foreignKey: 'ownerId',
         onDelete: 'CASCADE'
        }
        )

      User.hasMany(
        models.Review,
        {foreignKey: 'userId',
        onDelete: 'CASCADE'
        }
      )
    }

    static getCurrentUserById(id){
      return User.scope("currentUser").findByPk(id)
    }

    static async login({credential, password}){
      const {Op} = require('sequelize')
      
      const user = await User.scope('allInfo').findOne({
        where:{
          [Op.or] : {
            username: credential,
            email: credential
          }
        }
      })

      
      if(user && user.validatePassword(password)){
        const newUser = await User.scope('currentUser').findByPk(user.id)
        return newUser
      }
    }

    static async signup({firstName, lastName,username, email,password}){
      const hashedPassword = bcrypt.hashSync(password)
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword,
      })


      return await User.scope(['currentUser']).findByPk(newUser.id)
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First Name is required'
        },
        isAlpha: true,
        len: [2,30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last Name is required'
        },
        isAlpha: true,
        len: [2,30]
      }
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'User with that username already exists'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required'
        },
        len:[4,30],
        isNotEmail(value){
          if (Validator.isEmail(value)) throw new Error('Should not be an E-mail')
        },
       
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "User with that email already exists"
      },
      validate:{
        notEmpty: {
          args: true,
          msg: 'Invalid email'
        },
        len: [3,256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes: {
        exclude:['hashedPassword', 'updatedAt', 'email']
      }
    },
    scopes: {
      currentUser : {
        attributes : {
          exclude: ['hashedPassword']
        }
      },
      allInfo:{
        attributes: {}
      },
      noTimeStamp: {
        attributes:{
          exclude:['createdAt', 'updatedAt']
        }
      }
    }
  });
  return User;
};
