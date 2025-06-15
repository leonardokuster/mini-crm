import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Usuario extends Model {}

  Usuario.init({
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(245),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(245),
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false
  });

  return Usuario;
};