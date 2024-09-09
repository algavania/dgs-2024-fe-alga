import CategorySection from "../components/Category/CategorySection";
import ExpenseSection from "../components/Expense/ExpenseSection";
import WalletSection from "../components/Wallet/WalletSection";

export default function HomePage() {
  return (
    <section className="grid grid-cols-4" style={{height: "100vh"}}>
      <div className="p-12 col-span-3 bg-slate-200 relative h-full">
        <ExpenseSection />
      </div>
      <div className="p-12 col-span-1 bg-slate-100 flex flex-col gap-12 h-full">
        <WalletSection />
        <CategorySection />
      </div>
    </section>
  );
}
