import { Wallet } from "../../../models/wallet";

export default function WalletCard({ wallet }: { wallet: Wallet }) {
  return (
    <div className="flex gap-2">
      <div>Icon</div>
      <div>{wallet.name}</div>
    </div>
  );
}
