 // Start of Selection
module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define('Dashboard', {
    iframeCode: {
      type: DataTypes.TEXT,
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
    tableName: 'Dashboards', // Define explicitamente o nome da tabela
    freezeTableName: true, // Impede o Sequelize de pluralizar o nome
  });

  Dashboard.associate = (models) => {
    Dashboard.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Dashboard;
};
