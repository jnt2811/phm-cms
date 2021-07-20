import { localKeys } from "../../../constances";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem(localKeys.ACCESS_TOKEN);
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
