import express from 'express';
import { json } from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;
import logger from './middleware/logger.js';

const entities = {
    Account: require('./models/account').default,
    RecurringExpense: require('./models/recurringExpense').default,
    ExtraExpense: require('./models/extraExpenditure').default,
    Investment: require('./models/investment').default
};

//------------------------model associations - start ---------------------------------------
entities.Account.hasMany(entities.RecurringExpense, { foreignKey: 'account_id' });
entities.Account.hasMany(entities.ExtraExpense, { foreignKey: 'account_id' });
entities.Account.hasMany(entities.Investment, { foreignKey: 'account_id' });
entities.RecurringExpense.belongsTo(entities.Account, { foreignKey: 'account_id' });
entities.ExtraExpense.belongsTo(entities.Account, { foreignKey: 'account_id' });
entities.Investment.belongsTo(entities.Account, { foreignKey: 'account_id' });
//------------------------ model associations - end ----------------------------------------

app.use(json());

// Define routes
import apiRoutes from './routes/api.js';
app.use('/api', apiRoutes);

// Error handling middleware
import errorMiddleware from './middleware/error.js';
app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
