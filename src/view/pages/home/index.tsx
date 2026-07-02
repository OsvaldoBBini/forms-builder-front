import { profileServices } from "@/app/services/profileServices"
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/app/hooks/useAuth'

export function Home() {

  const { getUserInfo } = profileServices;
  const signOut = useAuth((state) => state.signOut) 

  const { data, isLoading } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });

  console.log({data, isLoading});

  return (
    <div>
      <h1>Home</h1>
      <button onClick={signOut}>Sair</button><br/>
    </div>
  );
}
