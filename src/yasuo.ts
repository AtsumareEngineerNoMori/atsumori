import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "./firebase";
import { app } from "./main";

interface User {
  uid: string;
}

async function loginButton(user: { email: string; password: string }) {
  const router = useRouter();
  const setCookie = (myId: string) => {
    app.$cookies.set("myId", myId);
  };
  const userCredential = await signInWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  const currentUser: User | null = userCredential.user;
  if (currentUser) {
    setCookie(currentUser.uid);
    router.push("/top");
    console.log("ログインできました");
  } else {
    console.log("ユーザーが存在しません");
  }
}

export { loginButton };
