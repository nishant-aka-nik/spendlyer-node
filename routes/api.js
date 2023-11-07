import { Router } from 'express';
const router = Router();
import recurringExpenseController from '../controllers/recurringExpenseController.js';
import accountController from '../controllers/accountController.js';
import investmentController from '../controllers/investmentController.js';
import accountValidation from '../middleware/accountValidation.js';
import extraExpenseController from '../controllers/extraExpenseController.js';

// Define API routes
//-------------------------account----------------
router.get('/user/:username', accountController.getAccountByUsername);
//-------------------------account----------------

//-------------------------investment----------------
router.post('/:username/investment', accountValidation.validateAccount, investmentController.addInvestment);
router.delete('/:username/investment/:id', accountValidation.validateAccount, investmentController.deleteInvestment)
//-------------------------investment----------------

//-------------------------recurring-expenses----------------
router.post('/:username/recurring-expense', accountValidation.validateAccount, recurringExpenseController.addRecurringExpense);
router.delete('/:username/recurring-expense/:id', accountValidation.validateAccount, recurringExpenseController.deleteRecurringExpense)
//-------------------------recurring-expenses----------------

//-------------------------extra-expenses----------------
router.post('/:username/extra-expense', accountValidation.validateAccount, extraExpenseController.addExtraExpense);
router.delete('/:username/extra-expense/:id', accountValidation.validateAccount, extraExpenseController.deleteExtraExpense)
//-------------------------extra-expenses----------------


export default router;