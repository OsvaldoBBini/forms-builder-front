import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';

interface ILoginChange {
  actionText: string;
  label: string;
  router: string;
}

export function LoginChange({ actionText, label, router }: ILoginChange) {

  const navigate = useNavigate();

  const handleClick = () => {
    if (router) {
      navigate(`/${router}`);
    }
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-green-400">
      <h3>
        {label}
      </h3>
      <Button onClick={handleClick}>
        {actionText}
      </Button>
    </div>
  )
}
