import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Cliente extends Model {}

  Cliente.init({
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
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    empresa: {
      type: DataTypes.STRING(245),
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING(245),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: false
  });

  return Cliente;
};