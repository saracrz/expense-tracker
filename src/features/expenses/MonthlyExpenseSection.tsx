import { useEffect, useState } from "react";
import type { Expense } from "./types";

import { getExpenses } from "./expensesService";
import { Button, Tabs, MonthHero } from "../../components/ui";
import { Expenses } from "./types";
import { Plus } from "lucide-react";
import { AddExpenseForm } from "./AddExpenseForm";

const formatAmount = (amount: number) => `${amount.toFixed(2)} €`;

export const MonthlyExpenseSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [expenses, setExpenses] = useState<Expenses>([]);

  const totalExpensesAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpenses();

      setExpenses(expenses);
    };

    fetchExpenses();
  }, []);

  const handleExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
    setOpenModal(false);
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-32 pt-4 sm:pt-10">
      <header className="mb-4 flex h-8 items-center justify-between">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Expenses
        </span>
        <span className="text-sm font-bold text-muted-foreground">
          {new Date().getFullYear()}
        </span>
      </header>

      <MonthHero
        total={formatAmount(totalExpensesAmount)}
        expenseCount={expenses.length}
      />

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 animate-in fade-in duration-200 motion-reduce:animate-none sm:items-center"
          onClick={() => setOpenModal(false)}
        >
          <AddExpenseForm
            onAddExpense={handleExpense}
            onClose={() => setOpenModal(false)}
          />
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
          className="pointer-events-auto h-14 px-7"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Plus />
          Add Expense
        </Button>
      </div>
    </main>
  );
};
