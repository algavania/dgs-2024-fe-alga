import { useEffect } from "react";
import { useCategory } from "../../../contexts/CategoryContext";
import { useExpense } from "../../../contexts/ExpenseContext";
import { useWallet } from "../../../contexts/WalletContext";
import ExpenseSection from "../components/ExpenseSection";
import WalletSection from "../components/WalletSection.tsx";
import CategorySection from "../components/CategorySection.tsx";

export default function HomePage() {
  const {
    fetchCategories,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory();
  const {
    fetchExpenses,
    loading: expenseLoading,
    error: expenseError,
  } = useExpense();
  const {
    fetchWallets,
    loading: walletLoading,
    error: walletError,
  } = useWallet();

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
    fetchWallets();
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
    <section className="container flex">
      <div className="flex-auto w-full">
        <ExpenseSection /> 
      </div>
      <div className="flex-1">
        <div style={{width: "20rem"}}>
        <WalletSection />
        <CategorySection />
        </div>
      </div>
    </section>
  );
}
