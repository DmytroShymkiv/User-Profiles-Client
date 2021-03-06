import React, { useState, useEffect } from "react";
import { useUser } from "../../Contexts/UserContext";

export default function DashboardPage() {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);
  const { getStats } = useUser();

  const fetchStats = async () => {
    const response = await getStats();
    if (response.error) alert(response.error);
    else setStats(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="title">Dashboard:</h1>
      {!loading && stats && (
        <div className="stats">
          <DashboardCard title="Users" value={stats.users} />
          <DashboardCard title="Profiles" value={stats.profiles} />
          <DashboardCard
            title="Profiles over 18 years old:"
            value={stats.profilesOverEighteen}
          />
        </div>
      )}
    </>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="card dashboard-card">
      <div className="title">{title}</div>
      <div className="dashboard-card__value">{value}</div>
    </div>
  );
}
