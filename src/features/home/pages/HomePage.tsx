import { useEffect } from "react";
import { useCategory } from "../../../contexts/CategoryContext";
import { useExpense } from "../../../contexts/ExpenseContext";
import { useWallet } from "../../../contexts/WalletContext";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseSection from "../components/ExpenseSection";

export default function HomePage() {
  const { fetchCategories, categories, loading: categoryLoading, error: categoryError } = useCategory();
  const { fetchExpenses, expenses, loading: expenseLoading, error: expenseError } = useExpense();
  const { fetchWallets, wallets, loading: walletLoading, error: walletError } = useWallet();

  useEffect(() => {
    // Fetch category, expense, and wallet data when component mounts
    // fetchCategories();
    fetchExpenses();
    // fetchWallets();
  }, []);

  if (categoryLoading || expenseLoading || walletLoading) {
    return <p>Loading...</p>;
  }

  if (categoryError || expenseError || walletError) {
    return (
      <div>
        {categoryError && <p>{categoryError}</p>}
        {expenseError && <p>{expenseError}</p>}
        {walletError && <p>{walletError}</p>}
      </div>
    );
  }

  return (
    <section className="container bg-red-500">
      <h1>Test</h1>

      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </div>

      <ExpenseSection expenses={expenses}/>

      <div>
        <h2>Wallets</h2>
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet._id}>{wallet.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
