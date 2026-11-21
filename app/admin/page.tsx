"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/Button/Button";
import { clearSession, getSession, getUsers } from "@/lib/storage";
import styles from "./page.module.scss";

function AdminPage() {
  const router = useRouter();
  const session = getSession();
  const isAdmin = session !== null && session.role === "admin";

  // дані беруться з Local Storage і дешифруються
  const users = isAdmin ? getUsers() : [];

  // на сторінку адміністратора пускаємо тільки адміністратора
  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  const logout = () => {
    clearSession();
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <h1>Welcome, administrator</h1>
      <p>Усі зареєстровані користувачі (дані дешифровані):</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.email}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && <p>Користувачів ще немає</p>}

      <Button classname={styles.button} onClick={logout}>
        Log out
      </Button>
    </div>
  );
}

// сторінка рендериться тільки в браузері, бо Local Storage є лише там
export default dynamic(() => Promise.resolve(AdminPage), { ssr: false });
