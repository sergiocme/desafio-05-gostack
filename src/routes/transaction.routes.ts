import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = transactionsRepository.all();
    const balanceObject = transactionsRepository.getBalance();

    return response.json({
      transactions: allTransactions,
      balance: balanceObject,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;

  try {
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transactionServiceData = createTransactionService.execute({
      title,
      value,
      type,
    });

    const transaction = transactionsRepository.create(transactionServiceData);
    return response.status(201).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
