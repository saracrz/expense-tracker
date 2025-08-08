import "./App.css";

import { useAuth } from "./features/auth/useAuth";
import { MonthlyExpenseSection } from "./features/expenses/MonthlyExpenseSection";
import { LoginSection } from "./features/auth/LoginSection";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{!user ? <LoginSection /> : <MonthlyExpenseSection />}</>;
}

export default App;
