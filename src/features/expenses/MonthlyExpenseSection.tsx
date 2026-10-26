import { useState } from "react";
import { useExpenses } from "./useExpenses";

import { AddExpenseForm } from "./AddExpenseForm";
import { Button, Tabs, MonthHero, Card } from "@/components/ui";

import { Plus } from "lucide-react";
import { formatAmount } from "@/lib/format";
import { ExpenseBreakdown } from "./ExpenseBreakdown";
import { AmountList } from "@/components/AmountList";
import { type Expense } from "./types";

export const MonthlyExpenseSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const { dataStatus, addExpense } = useExpenses();

  if (dataStatus.status === "loading") return <p>Loading…</p>; // provisional
  if (dataStatus.status === "failed") return <p>{dataStatus.message}</p>; // provisional

  const expenses = dataStatus.data;

  const totalExpensesAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const handleAddExpense = (expense: Expense) => {
    addExpense(expense);
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
            onAddExpense={handleAddExpense}
            onClose={() => setOpenModal(false)}
          />
        </div>
      )}

      <Tabs
        tabs={[
          {
            title: "Expenses",
            content: <ExpenseBreakdown items={expenses} />,
          },
          {
            title: "Income",
            content: (
              <Card>
                <AmountList items={[]} />
              </Card>
            ),
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
