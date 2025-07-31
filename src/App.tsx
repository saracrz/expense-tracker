import "./App.css";
import { LoginSection, MonthlyExpenseSection } from "./sections";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return <>{!user ? <LoginSection /> : <MonthlyExpenseSection />}</>;
}

export default App;
