export type AppUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

const AUTH_KEY = "watcom-user";

export function getSessionUser(): AppUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;

    const user = JSON.parse(raw) as Partial<AppUser>;
    if (!user || typeof user.email !== "string" || typeof user.name !== "string") {
      return null;
    }

    return {
      id: user.id || "dummy-user",
      email: user.email,
      name: user.name,
      createdAt: user.createdAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveSessionUser(user: AppUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearSessionUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
}

export function authenticateUser(email: string, password: string, fullName?: string): AppUser {
  const cleanedEmail = email.trim().toLowerCase();
  const cleanedPassword = password.trim();

  if (!cleanedEmail || !cleanedPassword) {
    throw new Error("Email and password are required.");
  }

  if (cleanedPassword.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const userName = (fullName || cleanedEmail.split("@")[0] || "Student")
    .trim()
    .replace(/\s+/g, " ");

  const user: AppUser = {
    id: "dummy-user",
    email: cleanedEmail,
    name: userName || "Student",
    createdAt: new Date().toISOString(),
  };

  saveSessionUser(user);
  return user;
}
