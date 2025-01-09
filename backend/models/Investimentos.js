module.exports = (sequelize, DataTypes) => {
    const Investimentos = sequelize.define('Investimentos', { // Corrigido para 'Investimentos'
      tipo: {
        type: DataTypes.ENUM('renda fixa', 'renda variável', 'fundos', 'criptos', 'outros'), // Tipo ENUM com as opções corretas
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      dataEntrada: {
        type: DataTypes.DATEONLY, // Garantindo que a data seja sem horário
        allowNull: false,
      },
      saldo: {
        type: DataTypes.DECIMAL(10, 2), // Definindo tipo DECIMAL com precisão
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

    return Investimentos; // Corrigido para retornar 'Investimentos'
  };