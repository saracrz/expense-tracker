export type Expense = {
  id: string;
  name: string;
  amount: number;
};

export type Expenses = Expense[];

export type NewExpense = Omit<Expense, "id">;

export type AddExpenseState =
  | { status: "idle" }
  | { status: "invalid"; message: string }
  | { status: "failed"; message: string }
  | { status: "success" };

export type ExpensesState =
  | { status: "loading" }
  | { status: "failed"; message: string }
  | { status: "success"; data: Expenses };
