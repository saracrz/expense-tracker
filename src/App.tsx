import { MonthlyExpenseSection } from "./features/expenses/MonthlyExpenseSection";
import { getMonthTheme } from "./lib/month";

function App() {
  return (
    <div style={getMonthTheme().style} className="min-h-dvh">
      <MonthlyExpenseSection />
    </div>
  );
}

export default App;
