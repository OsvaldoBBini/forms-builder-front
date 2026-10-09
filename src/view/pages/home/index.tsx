import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NewAnswerDialog } from "./components/newAnswerDialog";

export function Home() {


  const [isOpen, setIsOpen] = useState(false);

  const handleNewAnswer = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <div>
      <h1>Visão Geral</h1>
      <Button onClick={handleNewAnswer}>Nova Resposta</Button>
      
      {isOpen && <NewAnswerDialog open={isOpen} onClose={handleNewAnswer} />}
    </div>
  );
}
