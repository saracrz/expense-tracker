import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Expense } from "./types";

type FirebaseExpenseResponse = {
  amount: number;
  id: string;
  name: string;
}[];

export const addExpense = async (
  expense: Expense
): Promise<string | undefined> => {
  try {
    const docRef = await addDoc(collection(db, "expenses"), expense);

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return undefined;
  }
};

export const getExpenses = async (): Promise<FirebaseExpenseResponse> => {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  const expenses: FirebaseExpenseResponse = [];

  querySnapshot.forEach((doc) => {
    expenses.push({
      id: doc.id,
      name: doc.data().name,
      amount: doc.data().amount,
    });
  });

  return expenses;
};

export const deleteExpense = async (id: string) => {
  await deleteDoc(doc(db, "expenses", id));
};
