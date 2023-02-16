import { useContext } from "react";
import { UserContext } from "@/lib/UserContext";
import Link from "next/link";
import AppNavigation from "./AppNavigation";
import { getUserData, magic } from "@/lib/magic";

export default function AppHeader({}) {
  const [user, setUser] = useContext(UserContext);

  function openWallet() {
    magic.wallet.getInfo().then((walletInfo) => {
      // NOTE: this will only work if the user has connected via a
      // magic wallet, not via browser wallet (e.g. MetaMask)
      if (walletInfo?.walletType == "magic")
        magic.connect.showWallet().catch((err) => console.log(err));
      else alert("A non-magic walllet was connected");
    });
  }

  function disconnect() {
    // disconnect from magic
    magic.connect.disconnect();

    // clear the state
    setUser({});
  }

  function loginWithConnect() {
    magic.wallet
      .connectWithUI()
      .then((res) => {
        (async () => {
          await getUserData().then((data) => setUser(data));
        })();
      })
      .catch((err) => console.log(err));
  }

  return (
    <header className="border-b border-gray-300">
      <nav className="container flex justify-between py-3">
        <Link href={"/"} className="flex space-x-3">
          <img src={"/logo.svg"} alt="Magic.link" />
          <h2 className="text-2xl font-bold">demo</h2>
        </Link>

        <AppNavigation />

        <div className="">
          {user?.isLoggedIn ? (
            <div className="space-x-3">
              <button
                onClick={() => openWallet()}
                type="button"
                className="btn"
              >
                {user?.shortAddress || "Open wallet"}
              </button>

              <button
                onClick={() => disconnect()}
                type="button"
                className="btn"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithConnect()}
              type="button"
              className="btn"
              disabled={user?.loading}
            >
              {user?.loading ? "loading" : "Login with Connect"}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
