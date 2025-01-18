module.exports = (sequelize, DataTypes) => {
    const Facebook = sequelize.define('Facebook', {
      investimento: {
        type: DataTypes.DECIMAL(10, 2), // Alterado para DECIMAL para suportar valores como 2,50
        allowNull: false,
      },
      leads: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      custoPorLead: {
        type: DataTypes.DECIMAL(10, 2), // Alterado para DECIMAL para suportar valores como 2,50
        allowNull: false,
      },
      impressao: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
    }, {
      tableName: 'Facebook', // Define explicitamente o nome da tabela
      freezeTableName: true  // Impede o Sequelize de pluralizar o nome
    });

    Facebook.associate = (models) => {
      Facebook.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    };

    return Facebook;
  };