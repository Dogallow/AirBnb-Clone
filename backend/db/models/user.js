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
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    static associate(models) {
      // define association here
      User.belongsToMany(
        models.Spot,
        {through: models.Booking}
      )

      User.hasMany(
        models.Spot,
        {foreignKey: 'ownerId', onDelete: 'CASCADE'}
      )

      User.belongsToMany(
        models.Spot,
        {through: models.Review}
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
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signup({username, email,password}){
      const hashedPassword = bcrypt.hashSync(password)
      const newUser = await User.create({
        email,
        username,
        hashedPassword
      })
      return await User.scope('currentUser').findByPk(newUser.id)
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len:[4,30],
        isNotEmail(value){
          if (Validator.isEmail(value)) throw new Error('Should not be an E-mail')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
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
        exclude:['hashedPassword', 'updatedAt', 'email', 'createdAt']
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
      }
    }
  });
  return User;
};
