import { Button } from "../ui/button";

interface ILoginChange {
  actionText: string;
  label: string;
}

export function LoginChange({ actionText, label }: ILoginChange) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-green-400">
      <h3>
        {label}
      </h3>
      <Button>
        {actionText}
      </Button>
    </div>
  )
}
