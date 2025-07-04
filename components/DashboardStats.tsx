import React from "react";

type StatCardProps = {
  users: {
    verified: boolean;
    role: string;
  }[];
};

const DashboardStats: React.FC<StatCardProps> = ({ users }) => {
  const stats = [
    {
      label: "Total Users",
      count: users.length,
      icon: "bi-people-fill",
      color: "primary",
    },
    {
      label: "Active Users",
      count: users.filter((u) => u.verified).length,
      icon: "bi-person-check-fill",
      color: "success",
    },
    {
      label: "Pending",
      count: users.filter((u) => !u.verified).length,
      icon: "bi-clock-history",
      color: "warning",
    },
    {
      label: "Admins",
      count: users.filter((u) => u.role === "admin").length,
      icon: "bi-shield-lock-fill",
      color: "danger",
    },
  ];

  return (
    <div className="row g-4 mb-5">
      {stats.map((item, i) => (
        <div className="col-md-3" key={i}>
          <div className={`card stat-card border-0 shadow-sm p-4`}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="stat-label text-muted mb-1">{item.label}</p>
                <h4 className="stat-value fw-bold">{item.count}</h4>
              </div>
              <div className={`icon-circle bg-${item.color}`}>
                <i className={`bi ${item.icon} text-white`}></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
