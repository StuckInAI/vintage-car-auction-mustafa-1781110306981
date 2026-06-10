import { useState, useEffect } from 'react';
import type { User, AuthState } from '@/types';
import { getUsers, saveUsers, getCurrentUser, setCurrentUser, generateId } from '@/lib/storage';

export function useAuth(): {
  auth: AuthState;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (username: string, email: string, password: string, role: User['role']) => { success: boolean; error?: string };
  logout: () => void;
} {
  const [auth, setAuth] = useState<AuthState>({
    user: getCurrentUser(),
    isLoggedIn: !!getCurrentUser(),
  });

  useEffect(() => {
    const stored = getCurrentUser();
    setAuth({ user: stored, isLoggedIn: !!stored });
  }, []);

  function login(email: string, password: string): { success: boolean; error?: string } {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password.' };
    setCurrentUser(user);
    setAuth({ user, isLoggedIn: true });
    return { success: true };
  }

  function register(
    username: string,
    email: string,
    password: string,
    role: User['role']
  ): { success: boolean; error?: string } {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Email already registered.' };
    }
    if (users.find((u) => u.username === username)) {
      return { success: false, error: 'Username already taken.' };
    }
    const newUser: User = {
      id: generateId(),
      username,
      email,
      password,
      role,
      createdAt: Date.now(),
    };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    setAuth({ user: newUser, isLoggedIn: true });
    return { success: true };
  }

  function logout(): void {
    setCurrentUser(null);
    setAuth({ user: null, isLoggedIn: false });
  }

  return { auth, login, register, logout };
}
