import React from "react";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  verified: boolean;
  role: string;
  createdAt: string;
  lastLogin: string | null;
};

type Props = {
  user: User;
  onClose: () => void;
  onChange: (updated: User) => void;
  onSave: () => void;
};

export default function EditUserModal({ user, onClose, onChange, onSave }: Props) {
  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Name"
              value={user.name}
              onChange={(e) => onChange({ ...user, name: e.target.value })}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={user.email}
              onChange={(e) => onChange({ ...user, email: e.target.value })}
            />
            <select
              className="form-select"
              value={user.role}
              onChange={(e) => onChange({ ...user, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
