import Layout from "@/components/Layout";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function CollectiblesPage() {
  const { user } = useUser();

  return (
    <Layout title="Mint">
      <div className="ml-72 mt-3 h-full w-full rounded-lg bg-collectible-dark-purple px-5 py-7 md:w-auto">
        <p className="text-gray-strong">test of the minting section</p>
      </div>
    </Layout>
  );
}
