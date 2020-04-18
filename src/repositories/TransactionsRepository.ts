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
    return this.transactions.reduce<Balance>(
      (balance: Balance, transaction: Transaction) => {
        const newBalance = {
          ...balance,
          [transaction.type]: balance[transaction.type] + transaction.value,
        };
        newBalance.total = newBalance.income - newBalance.outcome;
        return newBalance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create(request: Transaction): Transaction {
    this.transactions.push(request);
    return request;
  }
}

export default TransactionsRepository;
