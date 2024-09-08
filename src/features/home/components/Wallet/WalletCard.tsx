import { Wallet3 } from "iconsax-react";
import { Wallet } from "../../../../models/wallet";

export default function WalletCard({ wallet }: { wallet: Wallet }) {
  return (
    <div className="flex gap-2 items-center my-4">
      <div className="p-2 bg-violet-100 rounded-lg">
        <Wallet3 size="20" color="#8b5cf6" variant="Bold"/>
      </div>
      <div className="font-medium text-gray-700">{wallet.name}</div>
    </div>
  );
}
