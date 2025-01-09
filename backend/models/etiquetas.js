module.exports = (sequelize, DataTypes) => {
  const Etiqueta = sequelize.define('Etiqueta', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "O nome da etiqueta não pode estar vazio"
        }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isHexColor(value) {
          const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
          if (!hexColorRegex.test(value)) {
            throw new Error('Cor inválida. Use um formato hexadecimal válido.');
          }
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  },
  {
    sequelize,
    modelName: 'Etiqueta',
    tableName: 'Etiquetas',
    timestamps: true,
    underscored: true
  });

  return Etiqueta;
};