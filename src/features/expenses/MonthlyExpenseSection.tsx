import { useEffect, useState, type FormEvent } from "react";

import { addExpense, getExpenses } from "./expensesService";
import { Input, Button, Tabs, MonthHero } from "../../components/ui";
import { Expenses } from "./types";
import { Plus, X } from "lucide-react";

const formatAmount = (amount: number) => `${amount.toFixed(2)} €`;

export const MonthlyExpenseSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenses, setExpenses] = useState<Expenses>([]);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpenses();

      setExpenses(expenses);
      const totalAmount = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      setTotalExpensesAmount(Math.round(totalAmount * 100) / 100);
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    if (!openModal) return;

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openModal]);

  const saveExpenseTotalAmount = (e: FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(expenseAmount.replace(",", "."));

    if (isNaN(parsedAmount)) {
      alert("Please enter a valid number for the expense amount.");
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: parsedAmount,
    };

    addExpense(newExpense);

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    setTotalExpensesAmount(
      (prevAmount) => Number(prevAmount) + newExpense.amount
    );

    setOpenModal(false);
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-32 pt-4 sm:pt-10">
      <header className="mb-4 flex h-8 items-center">
        <span className="font-display text-lg font-semibold tracking-tight">
          Expenses
        </span>
      </header>

      <MonthHero>
        <p className="mt-8 font-display text-4xl font-semibold tabular-nums tracking-tight">
          {formatAmount(totalExpensesAmount)}
        </p>
        <p className="mt-1 text-sm text-primary-foreground/80">
          spent this month
        </p>
      </MonthHero>

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 animate-in fade-in duration-200 motion-reduce:animate-none sm:items-center"
          onClick={() => setOpenModal(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-expense-title"
            onClick={(e) => e.stopPropagation()}
            onSubmit={saveExpenseTotalAmount}
            className="w-full max-w-md rounded-t-[2rem] bg-background p-6 pb-[max(2rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom-8 duration-300 motion-reduce:animate-none sm:rounded-[2rem] sm:pb-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="add-expense-title"
                className="font-display text-2xl font-semibold tracking-tight"
              >
                Add expense
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close"
                onClick={() => setOpenModal(false)}
              >
                <X />
              </Button>
            </div>
            <div className="grid gap-4">
              <Input
                label="Expense name"
                value={expenseName}
                autoFocus
                onChangeValue={(value) => setExpenseName(value)}
              />
              <Input
                label="Expense amount"
                placeholder="0.00"
                inputMode="decimal"
                value={expenseAmount}
                onChangeValue={(value) => setExpenseAmount(value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-6 h-12 w-full rounded-full text-base"
            >
              Save
            </Button>
          </form>
        </div>
      )}

      <Tabs
        tabs={[
          {
            title: "Expenses",
            items: expenses.map((exp) => ({
              itemName: exp.name,
              itemAmount: formatAmount(exp.amount),
            })),
          },
          {
            title: "Income",
            items: [{ itemName: "salary", itemAmount: "2000" }],
          },
        ]}
      />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 flex justify-center pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Button
          variant="default"
          size="lg"
          className="pointer-events-auto h-14 rounded-full px-7 text-base shadow-lg shadow-primary/30"
          onClick={() => {
            setOpenModal(true);
            setExpenseName("");
            setExpenseAmount("");
          }}
        >
          <Plus />
          Add Expense
        </Button>
      </div>
    </main>
  );
};
