import { useEffect, useState } from "react";
import "./styles/MonthlyExpenseSection.css";
import { addExpense, getExpenses } from "../firestoreService";
import { Input, RoundButton, Tabs } from "../components";
import { useAuth } from "../hooks/useAuth";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type Expense = {
  name: string;
  amount: number;
};

export type Expenses = Expense[];

export const MonthlyExpenseSection = () => {
  const { logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenses, setExpenses] = useState<Expenses>([]);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const currentMonth = new Date().getMonth() + 1;

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

  const saveExpenseTotalAmount = () => {
    const parsedAmount = parseFloat(expenseAmount.replace(",", "."));

    if (isNaN(parsedAmount)) {
      alert("Please enter a valid number for the expense amount.");
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: parsedAmount,
    };

    // Save to Firestore
    addExpense(newExpense);

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    setTotalExpensesAmount(
      (prevAmount) => Number(prevAmount) + newExpense.amount
    );

    setOpenModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <h2>{monthNames[currentMonth - 1]}</h2>
        <p>{totalExpensesAmount} €</p>
      </div>

      {openModal && (
        <div className="modal">
          <div className="close-modal" onClick={() => setOpenModal(false)}>
            <span>x</span>
          </div>
          <div className="expenses-inputs-wrapper">
            <Input
              placeholder="Expense name"
              value={expenseName}
              onChangeValue={(value) => setExpenseName(value)}
            />
            <Input
              placeholder="Expense amount"
              value={expenseAmount}
              onChangeValue={(value) => setExpenseAmount(value)}
            />
            <button onClick={saveExpenseTotalAmount}>Save</button>
          </div>
        </div>
      )}

      <Tabs
        tabs={[
          {
            title: "Expenses",
            items: expenses.map((exp) => ({
              itemName: exp.name,
              itemAmount: `${exp.amount.toString()} €`,
            })),
          },
          {
            title: "Income",
            items: [{ itemName: "salary", itemAmount: "2000" }],
          },
        ]}
      />

      <RoundButton
        onClick={() => {
          setOpenModal(true);
          setExpenseName("");
          setExpenseAmount("");
        }}
      />
    </>
  );
};
