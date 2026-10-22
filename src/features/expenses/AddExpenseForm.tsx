import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { AddExpenseState, Expense, NewExpense } from "./types";
import { addExpense } from "./expensesService";
import { Input, Button } from "@/components/ui";

type AddExpenseFormProps = {
  onAddExpense: (expense: Expense) => void;
  onClose: () => void;
};

export const AddExpenseForm = ({
  onAddExpense,
  onClose,
}: AddExpenseFormProps) => {
  const [state, formAction, isPending] = useActionState(addExpenseAction, {
    status: "idle",
  });

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  async function addExpenseAction(
    _prevState: AddExpenseState,
    formData: FormData,
  ): Promise<AddExpenseState> {
    const name = formData.get("name");
    const amount = formData.get("amount");

    if (typeof name !== "string" || typeof amount !== "string") {
      return { status: "invalid", message: "Please fill in all fields." };
    }

    const parsedAmount = parseFloat(amount.replace(",", "."));
    if (isNaN(parsedAmount)) {
      return {
        status: "invalid",
        message: "Please enter a valid number for the expense amount.",
      };
    }

    const newExpense: NewExpense = {
      name: name,
      amount: parsedAmount,
    };
    const newExpenseId = await addExpense(newExpense);

    if (!newExpenseId) {
      return { status: "failed", message: "Something happened, try again." };
    }

    onAddExpense({ ...newExpense, id: newExpenseId });
    return { status: "success" };
  }

  return (
    <form
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-expense-title"
      onClick={(e) => e.stopPropagation()}
      action={formAction}
      className="w-full max-w-md rounded-t-4xl bg-background p-6 pb-[max(2rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom-8 duration-300 motion-reduce:animate-none sm:rounded-[2rem] sm:pb-6"
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
          onClick={onClose}
        >
          <X />
        </Button>
      </div>
      <div className="grid gap-4">
        {(state.status === "invalid" || state.status === "failed") && (
          <p role="alert" className="text-sm text-destructive">
            {state.message}
          </p>
        )}
        <Input name="name" label="Expense name" autoFocus />
        <Input
          name="amount"
          label="Expense amount"
          placeholder="0.00"
          inputMode="decimal"
        />
      </div>
      <Button
        disabled={isPending}
        type="submit"
        size="lg"
        className="mt-6 h-12 w-full rounded-full text-base"
      >
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};
