import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AvatarComponentProps {
  fullName: string;
  email: string;
}

export function AvatarComponent({ fullName, email }: AvatarComponentProps) {
  
  const handleFallBackText = () => {
    const nameParts = fullName.split(' ');
    return nameParts.map((part) => part[0]).join('');
  }
  
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        <AvatarFallback className="rounded-lg">{handleFallBackText()}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{fullName}</span>
        <span className="truncate text-xs text-muted-foreground">
          {email}
        </span>
      </div>
    </>
  )
}
