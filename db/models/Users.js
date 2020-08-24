const {Model, DataTypes} = require('sequelize')
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');

class Users extends Model {
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'users',
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});

module.exports = Users;