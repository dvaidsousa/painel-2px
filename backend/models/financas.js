module.exports = (sequelize, DataTypes) => {
    const Financa = sequelize.define('Financa', {
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
    });

    return Financa;
  };