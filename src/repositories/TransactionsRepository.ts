import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (balance, transaction: Transaction) => {
        return {
          ...balance,
          [transaction.type]: balance[transaction.type] + transaction.value,
        };
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(request: Transaction): Transaction {
    this.transactions.push(request);
    return request;
  }
}

export default TransactionsRepository;
