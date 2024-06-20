import { useState } from "react";
import { Input, RoundButton, Tabs } from "../components";
import "./styles/MonthlyExpenseSection.css";

export const MonthlyExpenseSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const currentMonth = new Date().getMonth() + 1;

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

  const saveExpenseTotalAmount = () => {
    setTotalExpensesAmount(
      (prevAmount) => prevAmount + parseFloat(expenseAmount)
    );
    setExpenseAmount("");
    setOpenModal(false);
  };

  return (
    <>
      <div>
        <h2>{monthNames[currentMonth - 1]}</h2>
        <p>{totalExpensesAmount}</p>
      </div>
      {openModal && (
        <div className="modal">
          <div className="close-modal" onClick={() => setOpenModal(false)}>
            <span>x</span>
          </div>
          <div>
            <Input
              placeholder="Introduce expense amount"
              value={expenseAmount}
              onChangeValue={(e) => setExpenseAmount(e.target.value)}
            />
            <button onClick={saveExpenseTotalAmount}>save</button>
          </div>
        </div>
      )}
      <>
        <Tabs
          tabs={[
            {
              title: "Income",
              items: [{ itemName: "salary", itemAmount: "2000" }],
            },
            {
              title: "Expenses ",
              items: [
                { itemName: "cinema", itemAmount: "10" },
                { itemName: "gym", itemAmount: "30" },
              ],
            },
          ]}
        />
      </>
      <RoundButton onClick={() => setOpenModal(true)} />
    </>
  );
};
