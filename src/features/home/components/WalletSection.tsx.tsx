import { useEffect } from "react";
import Button from "../../../components/Button/Button";
import { useWallet } from "../../../contexts/WalletContext";
import WalletCard from "./WalletCard";
import Loading from "../../../components/Loading/Loading";
import { useSnackbar } from "notistack";

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
      <div className="flex justify-between">
        <h1>Wallets</h1>
        <Button title="Add" onClick={() => {}} />
      </div>

      {wallets.map((wallet) => (
        <WalletCard key={wallet._id} wallet={wallet} />
      ))}

      {canLoadMore && (
        <div className="flex justify-end">
          <Button
            title="Load More"
            onClick={() => {
              fetchWallets();
            }}
          />
        </div>
      )}
    </section>
  );
}
