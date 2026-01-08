import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Keep localStorage and state in sync if user reloads
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid email or password");

      const data = await res.json();

      setUser(data); // ✅ update state
    } catch (err) {
      alert(err.message);
      throw err; // rethrow for async handling
    }
  };

  // ---------------- SIGNUP ----------------
  const signup = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();

      setUser(data); // ✅ update state
    } catch (err) {
      alert(err.message);
      throw err;
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    setUser(null); // ✅ clears state and triggers Navbar update
  };

  // ---------------- UPDATE USER ----------------
  const updateUser = async (updatedData) => {
    try {
      const res = await fetch(`http://localhost:8080/api/auth/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, ...updatedData }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setUser(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  // ---------------- SELECT ADDRESS ----------------
  const selectAddress = (address) => {
    const updated = { ...user, selectedAddress: address };
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        selectAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
