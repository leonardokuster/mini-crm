import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Interacao extends Model {
    static associate(models) {
      Interacao.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'cliente',
      });
    }
  }

  Interacao.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    cliente_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('reuniao', 'ligacao', 'e-mail', 'outro'),
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    observacoes: {
      type: DataTypes.TEXT('medium'),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Interacao',
    tableName: 'interacoes',
    timestamps: false
  });

  return Interacao;
};