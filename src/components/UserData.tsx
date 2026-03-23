"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { deleteUser } from "@/redux/slice";
import styles from "./UserData.module.css";

export default function UserData() {
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!users.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No Records Found</p>
        <button
          className={styles.btnCreateEmpty}
          onClick={() => router.push("/")}
        >
          Create New
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.tableWrapper}>
        <p className={styles.tableTitle}>Users</p>
        <table className={styles.tables}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Mobile</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.tr}>
                <td className={styles.td}>
                  {user.name} {user.lastname}
                </td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.mobile}</td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button
                      className={styles.btnEdit}
                      onClick={() => router.push(`/edit/${user.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={() => dispatch(deleteUser(user.id))}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className={styles.createBtn} onClick={() => router.push("/")}>
        + Create New
      </button>
    </div>
  );
}