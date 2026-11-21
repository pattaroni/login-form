"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/Button/Button";
import { clearSession, getSession } from "@/lib/storage";
import styles from "./page.module.scss";

function UserPage() {
  const router = useRouter();
  const session = getSession();
  const isUser = session !== null && session.role === "user";

  useEffect(() => {
    if (!isUser) {
      router.replace("/");
    }
  }, [isUser, router]);

  if (!isUser) {
    return null;
  }

  const logout = () => {
    clearSession();
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <h1>Welcome, {session.name}</h1>

      <article className={styles.article}>
        <h2>Симетричне шифрування</h2>
        <p>
          Симетричне шифрування - це спосіб шифрування, при якому для
          шифрування і дешифрування використовується один і той самий секретний
          ключ. Відправник і отримувач повинні заздалегідь обмінятися цим
          ключем і зберігати його в таємниці.
        </p>
        <p>
          Процес шифрування можна записати як C = E<sub>K</sub>(M), де M -
          відкрите повідомлення, K - ключ, C - шифротекст. Дешифрування
          записується як M = D<sub>K</sub>(C), тобто функція D є оберненою до E
          при тому самому ключі K.
        </p>
        <p>
          Стійкість симетричного шифру залежить від надійності алгоритму і від
          секретності ключа, а не від секретності самого алгоритму. Якщо
          зловмисник перехопить ключ, він зможе розшифрувати всі повідомлення.
        </p>
        <p>
          Приклади симетричних алгоритмів: шифр Цезаря, ROT13, шифр Віженера,
          DES, AES. У цьому застосунку дані користувачів перед збереженням у
          Local Storage шифруються шифром Віженера, а на сторінці
          адміністратора дешифруються тим самим ключем.
        </p>
      </article>

      <Button classname={styles.button} onClick={logout}>
        Log out
      </Button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(UserPage), { ssr: false });
