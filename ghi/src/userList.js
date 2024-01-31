import { useGetUsersQuery } from "./store/usersApi";
import { update, remove } from "./store/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function UsersList() {
  const token = useSelector((state) => state.authHandler.token);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{token}</h1>
      <button onClick={() => dispatch(update("kl4j3lf"))}>Update</button>
      <button onClick={() => dispatch(remove())}>Delete</button>
    </div>
  );
}
