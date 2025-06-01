
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): any => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const login = useCallback(async (user: Partial<User>) => {
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
