const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const logger = require('./middleware/logger');

const entities = {
    Account: require('./models/account'),
    RecurringExpense: require('./models/recurringExpense'),
    ExtraExpense: require('./models/extraExpenditure'),
    Investment: require('./models/investment')
};

entities.Account.hasMany(entities.RecurringExpense, { foreignKey: 'account_id' });
entities.Account.hasMany(entities.ExtraExpense, { foreignKey: 'account_id' });
entities.Account.hasMany(entities.Investment, { foreignKey: 'account_id' });
entities.RecurringExpense.belongsTo(entities.Account, { foreignKey: 'account_id' });
entities.ExtraExpense.belongsTo(entities.Account, { foreignKey: 'account_id' });
entities.Investment.belongsTo(entities.Account, { foreignKey: 'account_id' });

app.use(bodyParser.json());

// Define routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Error handling middleware
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
