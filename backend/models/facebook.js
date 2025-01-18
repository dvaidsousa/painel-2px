module.exports = (sequelize, DataTypes) => {
    const Facebook = sequelize.define('Facebook', {
      valor: {
        type: DataTypes.DECIMAL(10, 2), // Definindo tipo DECIMAL com precisão
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM('entrada', 'saida'), // Tipo ENUM, com as opções 'entrada' e 'saida'
        allowNull: false,
      },
      dataEntrada: {
        type: DataTypes.DATEONLY, // Garantindo que a data seja sem horário
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING(255), // Aumentando o tamanho do campo descricao
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