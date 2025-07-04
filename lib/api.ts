export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  verified: boolean;
  role: string;
  createdAt: string;
  lastLogin: string | null;
};

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

export async function verifyUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verified: true }),
  });
  if (!res.ok) throw new Error("Failed to verify user");
  return res.json();
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
}

export async function updateUser(user: Partial<User> & { id: number }): Promise<User> {
  const res = await fetch(`/api/users/${user.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role,
    }),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function inviteUser(data: { username: string; email: string; role: string }) {
  const res = await fetch("/api/invite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to invite user");
  }

  return res.json(); 
}
