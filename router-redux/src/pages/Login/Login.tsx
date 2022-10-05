import { useDispatch } from "react-redux";
import { createUser } from "../../redux/states/user";
import { getMorty } from "../../services";

function Login() {
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const result = await getMorty();
      dispatch(createUser(result));
    } catch (error) {}
  };
  return (
    <div>
      <h2>Hola este es el Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
