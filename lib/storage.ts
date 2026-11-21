import { FormValues, Session } from "@/types/form";
import { decrypt, encrypt } from "./cipher";

const USERS_KEY = "users";
const SESSION_KEY = "session";

// користувачі у тому вигляді, як вони лежать у Local Storage (зашифровані)
export function getEncryptedUsers(): FormValues[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// розшифровані користувачі
export function getUsers(): FormValues[] {
  const encryptedUsers = getEncryptedUsers();
  const users: FormValues[] = [];

  for (const user of encryptedUsers) {
    users.push({
      firstName: decrypt(user.firstName),
      lastName: decrypt(user.lastName),
      email: decrypt(user.email),
      password: decrypt(user.password),
    });
  }

  return users;
}

// перед збереженням у Local Storage кожне поле шифрується
export function addUser(user: FormValues): boolean {
  const users = getUsers();

  for (const item of users) {
    if (item.email === user.email) {
      return false;
    }
  }

  const encryptedUsers = getEncryptedUsers();
  encryptedUsers.push({
    firstName: encrypt(user.firstName),
    lastName: encrypt(user.lastName),
    email: encrypt(user.email),
    password: encrypt(user.password),
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(encryptedUsers));

  return true;
}

export function setSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
