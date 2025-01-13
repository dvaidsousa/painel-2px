module.exports = (sequelize, DataTypes) => {
    const Notas = sequelize.define(
      'Notas',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.STRING,
          allowNull: true,
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
        },
      },
      {
        tableName: 'notas',
        timestamps: true,
      }
    );
    
    return Notas;
  };  