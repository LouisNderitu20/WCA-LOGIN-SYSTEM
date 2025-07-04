import React from "react";

type Props = {
  message: string;
  onClose: () => void;
};

export default function ToastNotification({ message, onClose }: Props) {
  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div className="toast show align-items-center text-bg-success border-0">
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}
