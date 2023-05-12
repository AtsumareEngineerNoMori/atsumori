// 引数：管理者idと参加者id
// 管理者、参加者、その他
function userJudge(adminId, joinIds, myId) {
  if (myId === adminId) {
    return 1;
  } else if (joinIds.includes(myId)) {
    return 2;
  } else {
    return 3;
  }
}

// 管理者か否か
function adminJudge(adminId, myId) {
  if (myId === adminId) {
    return 1;
  } else {
    return 2;
  }
}

// 参加者か否か
function joinJudge(joinIds, myId) {
  if (joinIds.includes(myId)) {
    return 1;
  } else {
    return 2;
  }
}

function myIdJudge() {
  if (import.meta.env.VITE_MYID == 1) {
    return "chat1";
  } else if (import.meta.env.VITE_MYID == 2) {
    return "chat2";
  } else if (import.meta.env.VITE_MYID == 3) {
    return "chat3";
  } else if (import.meta.env.VITE_MYID == 4) {
    return "chat4";
  } else {
    return "chat5";
  }
}

export { userJudge, adminJudge, joinJudge, myIdJudge };
