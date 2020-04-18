import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(request: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    const insufficientFunds =
      request.type === 'outcome' && total - request.value < 0;

    if (!['outcome', 'income'].includes(request.type)) {
      throw new Error('Invalid transaction type');
    }

    if (insufficientFunds) {
      throw new Error('Insufficient funds');
    }

    return new Transaction(request);
  }
}

export default CreateTransactionService;
