import { useEffect } from "react";
import { localKeys } from "../constances";

const Login = () => {
  const loginAsAdmin = () => {
    localStorage.setItem(localKeys.ACCESS_TOKEN, "qwerty");
    localStorage.setItem(localKeys.ROLE, "admin");
    window.location.reload();
  };

  const loginAsVolunteer = () => {
    localStorage.setItem(localKeys.ACCESS_TOKEN, "qwerty");
    localStorage.setItem(localKeys.ROLE, "volunteer");
    window.location.reload();
  };

  const loginAsClinic = () => {
    localStorage.setItem(localKeys.ACCESS_TOKEN, "qwerty");
    localStorage.setItem(localKeys.ROLE, "clinic");
    window.location.reload();
  };

  useEffect(() => {
    localStorage.removeItem(localKeys.ACCESS_TOKEN);
    localStorage.removeItem(localKeys.ROLE);
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>

      <button onClick={loginAsAdmin}>Login as Admin</button>

      <button onClick={loginAsVolunteer}>Login as Volunteer</button>

      <button onClick={loginAsClinic}>Login as Clinic</button>
    </div>
  );
};

export default Login;
