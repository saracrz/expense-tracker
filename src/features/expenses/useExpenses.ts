import { useEffect, useState } from "react";
import { getExpenses } from "@/features/expenses/expensesService";
import { Expense, ExpensesState } from "@/features/expenses/types";

export const useExpenses = () => {
  const [dataStatus, setDataStatus] = useState<ExpensesState>({
    status: "loading",
  });

  useEffect(() => {
    let ignore = false;
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();

        !ignore && setDataStatus({ status: "success", data: data });
      } catch (error) {
        !ignore &&
          setDataStatus({
            status: "failed",
            message: (error as Error).message,
          });
      }
    };

    fetchExpenses();
    return () => {
      ignore = true;
    };
  }, []);

  const addExpense = (expense: Expense) => {
    setDataStatus((prev) => {
      if (prev.status !== "success") return prev;
      return { status: "success", data: [...prev.data, expense] };
    });
  };

  return { dataStatus, addExpense };
};
