import { Separator } from "../ui/separator";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <>
      <header className="flex justify-between items-center pb-1">
        <h1>{title}</h1>
      </header>
      <Separator/>
    </>
  )
}
