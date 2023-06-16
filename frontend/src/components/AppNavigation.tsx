import Link from "next/link";
import styles from "@/styles/Nav.module.css";
import { useUser } from "@/context/UserContext";

export default function AppNavigation({}) {
  const { user } = useUser();

  return (
    <ul className={styles.linkArea}>
      {user && user?.address && (
        <li>
          <Link href={`/profile/${user?.address}`}>profile</Link>
        </li>
      )}
      <li>
        <Link href={"/mint"}>mint</Link>
      </li>
      <li>
        <Link href={"/community/nike"}>Nike Community</Link>
      </li>
    </ul>
  );
}
