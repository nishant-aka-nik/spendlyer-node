const Account = require('../models/account');
const logger = require('./logger');

// Define a middleware function for account validation
async function validateAccount(req, res, next) {
    try {
        // Extract the username from the request parameters
        const usernameToFind = req.params.username; // Get the username from the request query parameter

        if (!usernameToFind) {
            return res.status(400).json({ message: 'Username parameter is missing in the request.' });
        }

        const account = await Account.findOne({
            where: { username: usernameToFind }
        });

        if (account) {
            logger.info(account);
            req.account_id = account.id;
            next();
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'middleware: Failed to validate account' });
    }
}

module.exports = {
    validateAccount
};