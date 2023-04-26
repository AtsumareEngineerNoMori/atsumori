import { getAuth } from "@firebase/auth";

// ログイン中Id
const myId = 5;
// const auth = getAuth();
// const myId = auth.currentUser?.uid;

// 引数：管理者idと参加者id
// 管理者、参加者、その他
function userJudge(adminId, joinIds) {
  // console.log("sss",joinIds);
  if (myId === adminId) {
    return 1;
  } else if (joinIds.includes(myId)) {
    return 2;
  } else {
    return 3;
  }
}

// 管理者か否か
function adminJudge(adminId) {
  if (myId === adminId) {
    return 1;
  } else {
    return 2;
  }
}

// 参加者か否か
function joinJudge(joinIds) {
  if (joinIds.includes(myId)) {
    return 1;
  } else {
    return 2;
  }
}

export { userJudge, adminJudge, joinJudge };
