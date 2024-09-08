import ExpenseSection from "../components/ExpenseSection";
import WalletSection from "../components/WalletSection.tsx";
import CategorySection from "../components/CategorySection.tsx";

export default function HomePage() {
  return (
    <section className="container grid grid-cols-4" style={{height: "100vh"}}>
      <div className="p-12 col-span-3 bg-slate-200 h-full">
        <ExpenseSection />
      </div>
      <div className="p-12 col-span-1 bg-slate-100 flex flex-col gap-12 h-full">
        <WalletSection />
        <CategorySection />
      </div>
    </section>
  );
}
