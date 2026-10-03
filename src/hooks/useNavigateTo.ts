import { useNavigate } from "react-router-dom";

export function useNavigateTo() {
  
  const navigate = useNavigate();

  const handleNavigateTo = (address: string) => {
    navigate(address);
  }

  return {
    handleNavigateTo,
  }

}
