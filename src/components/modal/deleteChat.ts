import { realtimeDB } from "../../firebase";
import {
  ref as dbRef,
  orderByChild,
  query,
  startAt,
  endAt,
  remove,
  get,
} from "firebase/database";
import { myIdJudge } from "../../userJudge";

const deleteChat = async (id: number, order: string) => {
  const q = query(
    dbRef(realtimeDB, myIdJudge()),
    orderByChild(order),
    startAt(String(id)),
    endAt(String(id))
  );
  await get(q).then((snapshot) => {
    snapshot.forEach((a) => {
      remove(a.ref);
    });
  });
};

export { deleteChat };
