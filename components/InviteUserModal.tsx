import React from "react";

type Props = {
  data: {
    username: string;
    email: string;
    role: string;
  };
  onClose: () => void;
  onChange: (data: { username: string; email: string; role: string }) => void;
  onSubmit: () => void;
};

export default function InviteUserModal({ data, onClose, onChange, onSubmit }: Props) {
  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Invite New User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              value={data.username}
              onChange={(e) => onChange({ ...data, username: e.target.value })}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
            />
            <select
              className="form-select"
              value={data.role}
              onChange={(e) => onChange({ ...data, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSubmit}>
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
