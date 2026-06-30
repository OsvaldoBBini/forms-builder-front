import { profileServices } from "@/app/services/profileServices"
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/app/hooks/useAuth'
import { FormsTextField } from "@/components/forms/formsTextField";
import { FormsRadioSelection } from "@/components/forms/formsRadioSelection";

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

      <FormsTextField 
        questionNumber="1" 
        label="Qual o seu nome?" 
        size="small"/>

      <FormsTextField 
        questionNumber="2" 
        label="Qual o seu nome?" 
        size="large"/>

      <FormsRadioSelection 
        questionNumber="3"
        label="Selecionar"
        options={[
          {label: "selecao", value: "valor1"},
          {label: "selecao2", value: "valor2"},
        ]}
      />

      <button onClick={signOut}>Sair</button><br/>
    </div>
  );
}
