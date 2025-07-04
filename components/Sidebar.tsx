import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar p-4">
      <div className="text-center mb-4">
        <Image src="/icipe-logo.png" alt="ICIPE Logo" width={100} height={50} />
        <h2 className="logo mt-2">WCA ICIPE Admin</h2>
      </div>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <a className="nav-link" href="#dashboard-section">
            <i className="bi bi-house-door me-2"></i> Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#users-section">
            <i className="bi bi-people me-2"></i> Users
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#settings-section">
            <i className="bi bi-gear me-2"></i> Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}
