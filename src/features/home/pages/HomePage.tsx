import ExpenseSection from "../components/ExpenseSection";
import WalletSection from "../components/WalletSection.tsx";
import CategorySection from "../components/CategorySection.tsx";

export default function HomePage() {
  return (
    <section className="container flex">
      <div className="flex-auto w-full">
        <ExpenseSection />
      </div>
      <div className="flex-1">
        <div style={{ width: "20rem" }}>
          <WalletSection />
          <CategorySection />
        </div>
      </div>
    </section>
  );
}
