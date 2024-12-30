// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { AuthState } from '@/types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  return authState;
}
