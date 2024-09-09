import { useEffect, useState } from "react";
import WalletCard from "./WalletCard";
import WalletModal from "./WalletModal";
import { useSnackbar } from "notistack";
import { useWallet } from "../../../../contexts/WalletContext";
import Loading from "../../../../components/Loading/Loading";

export default function WalletSection() {
  const { wallets, canLoadMore, fetchWallets, loading, error: walletError } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onClick={() => setIsModalOpen(true)}
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

      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* Add WalletModal */}
    </section>
  );
}
