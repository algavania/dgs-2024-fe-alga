import { useEffect } from "react";
import Button from "../../../components/Button/Button";
import { useWallet } from "../../../contexts/WalletContext";
import WalletCard from "./WalletCard";
import Loading from "../../../components/Loading/Loading";
import { useSnackbar } from "notistack";
import { AddSquare } from "iconsax-react";

export default function WalletSection() {
  const { wallets, canLoadMore, fetchWallets, loading, error: walletError } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    if (walletError) {
      enqueueSnackbar(walletError, { variant: "error" });
    }
  }, [walletError, enqueueSnackbar]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-lg text-gray-700 font-bold">Wallets</h1>
        <div
          className="text-sm font-medium text-blue-700 px-4 py-2 rounded-lg hover:bg-white hover:underline hover:shadow-sm cursor-pointer transition"
        >
          Add
        </div>
      </div>

      {wallets.map((wallet) => (
        <WalletCard key={wallet._id} wallet={wallet} />
      ))}

      {canLoadMore && (
        <div className="flex justify-center">
          <div
            className="text-sm font-medium text-blue-700 px-4 py-2 rounded-lg hover:bg-white hover:underline hover:shadow-sm cursor-pointer transition"
            onClick={() => {
              fetchWallets();
            }}
          >
            Load More
          </div>
        </div>
      )}
    </section>
  );
}