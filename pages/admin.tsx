import { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import UserTable from "@/components/UserTable";
import EditUserModal from "@/components/EditUserModal";
import InviteUserModal from "@/components/InviteUserModal";
import ToastNotification from "@/components/ToastNotification";
import {
  fetchUsers,
  verifyUser,
  deleteUser,
  updateUser,
  inviteUser,
  type User,
} from "@/lib/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ username: "", email: "", role: "user" });
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!user || typeof user !== "object") return false;
    const lowerCaseSearch = search.toLowerCase();
    return (
      user.email?.toLowerCase().includes(lowerCaseSearch) ||
      user.username?.toLowerCase().includes(lowerCaseSearch) ||
      user.name?.toLowerCase().includes(lowerCaseSearch)
    );
  });

  const handleVerify = async (id: number) => {
    try {
      const updatedUser = await verifyUser(id);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, verified: true } : user
        )
      );
      setToastMessage(`User ${updatedUser.email} has been verified.`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setToastMessage("User deleted successfully.");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedUser) return;
    try {
      const updatedUser = await updateUser(selectedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setShowEditModal(false);
      setToastMessage(`User ${updatedUser.username} updated successfully.`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInviteSubmit = async () => {
    try {
      const { user: newUser } = await inviteUser(inviteData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setShowInviteModal(false);
      setInviteData({ username: "", email: "", role: "user" });
      setToastMessage(`Invitation sent to ${newUser.email}`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error: any) {
      alert("Failed to invite user: " + error.message);
    }
  };

  return (
    <>
      <Head>
        <title>ICIPE Admin Dashboard | WCA</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/admin.css" />
      </Head>

      <div className="admin-layout d-flex">
        <Sidebar />
        <main className="main-content flex-grow-1 p-5">
          {isLoading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Loading users...</p>
            </div>
          ) : (
            <>
              <div
                id="dashboard-section"
                className="header d-flex justify-content-between align-items-center mb-5"
              >
                <div>
                  <h1 className="page-title">Welcome, Admin</h1>
                  <p className="text-muted">Manage users, settings & permissions</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-primary">Admin</span>
                  <img
                    src="/favicon.ico"
                    className="rounded-circle border"
                    width={60}
                    height={60}
                    alt="avatar"
                  />
                </div>
              </div>

              <DashboardStats users={users} />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowInviteModal(true)}
                >
                  <i className="bi bi-person-plus me-2"></i> Invite User
                </button>
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Search by email, username, or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <UserTable
                users={filteredUsers}
                onEdit={(user) => {
                  setSelectedUser(user);
                  setShowEditModal(true);
                }}
                onDelete={handleDelete}
              />

              <div
                id="settings-section"
                className="card border-0 shadow-sm mt-5 p-4"
              >
                <h5 className="fw-semibold mb-3">Settings</h5>
                <p className="text-muted">Content for administrative settings will go here.</p>
              </div>
            </>
          )}
        </main>
      </div>

      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onChange={(updatedUser) => setSelectedUser(updatedUser)}
          onSave={handleEditSubmit}
        />
      )}

      {showInviteModal && (
        <InviteUserModal
          data={inviteData}
          onClose={() => setShowInviteModal(false)}
          onChange={(data) => setInviteData(data)}
          onSubmit={handleInviteSubmit}
        />
      )}

      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
}
