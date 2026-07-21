import { useAuth } from '@/app/hooks/useAuth'

export function Home() {
  const signOut = useAuth((state) => state.signOut);
  
  const handleSignOut = () => {
    signOut();
    window.location.href = '/signout'
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sair</button><br/>
    </div>
  );
}
