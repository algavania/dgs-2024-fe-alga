import ExpenseSection from "../components/ExpenseSection";
import WalletSection from "../components/WalletSection.tsx";
import CategorySection from "../components/CategorySection.tsx";

export default function HomePage() {
  return (
    <section className="container grid grid-cols-4">
      <div className="p-12 col-span-3 bg-slate-200">
        <ExpenseSection />
      </div>
      <div className="p-12 col-span-1 bg-slate-100">
        <div style={{ width: "20rem" }}>
          <WalletSection />
          <CategorySection />
        </div>
      </div>
    </section>
  );
}
