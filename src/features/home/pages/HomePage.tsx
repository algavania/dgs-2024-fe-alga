import { useEffect } from "react";
import { useCategory } from "../../../contexts/CategoryContext";
import { useExpense } from "../../../contexts/ExpenseContext";
import { useWallet } from "../../../contexts/WalletContext";
import ExpenseSection from "../components/ExpenseSection";

export default function HomePage() {
  const {
    fetchCategories,
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory();
  const {
    fetchExpenses,
    expenses,
    expenseResponse,
    loading: expenseLoading,
    error: expenseError,
  } = useExpense();
  const {
    fetchWallets,
    wallets,
    loading: walletLoading,
    error: walletError,
  } = useWallet();

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
    <section className="container">
      <ExpenseSection expenses={expenses} expenseResponse={expenseResponse} />
    </section>
  );
}
