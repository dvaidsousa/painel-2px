module.exports = (sequelize, DataTypes) => {
    const Contas = sequelize.define('Contas', {
      nome: {
        type: DataTypes.STRING(20), // Aumentando o tamanho do campo descricao
        allowNull: false,
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2), // Definindo tipo DECIMAL com precisão
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM('Pagar', 'Receber'), // Tipo ENUM, com as opções 'pagar' e 'receber'
        allowNull: false,
      },
      dataVencimento: {
        type: DataTypes.DATEONLY, // Garantindo que a data seja sem horário
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

    return Contas;
  };