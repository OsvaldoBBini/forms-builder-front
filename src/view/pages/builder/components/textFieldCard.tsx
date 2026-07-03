import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import z from "zod"

const schema = z.object({
  label: z.string().min(1, 'Texto inválido'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ITextFieldModal {
  questionNumber: string;
  fieldType: string;
  onMenuSelection: (fieldType: string | null) => void;
  onAddField: (field: { label: string; description?: string; fieldType: string }) => void;
}

export function TextFieldModal(
  { 
    questionNumber, 
    fieldType, 
    onAddField, 
    onMenuSelection 
  }: ITextFieldModal) {

  const { handleSubmit: hookFormSubmit, register } = useForm<FormData>({
      resolver: zodResolver(schema),
    });

  const handleSubmit = hookFormSubmit(
    (data) => { 
      onAddField({ label: data.label, description: data.description, fieldType: fieldType });
      onMenuSelection(null);
    },
    (errors) => {
    console.error("Validation failed. Errors:", errors);
  }
  );

  return (
    <form onSubmit={handleSubmit} id="text-field-form">
      <Card size="sm" className="mx-auto w-full flex flex-col gap-2 p-4">
        <CardHeader>
          <CardTitle className="w-full flex items-center">
            <span>
              {questionNumber}.
            </span>
            <Field>
              <Input 
                className="rounded-none border-0 border-b border-input shadow-none focus-visible:border-current focus-visible:ring-0 focus-visible:shadow-none" placeholder="Digite sua pergunta..." 
                id="label"
                {...register("label")}/>
            </Field>
          </CardTitle>
          <CardDescription>
            <Field>
              <Input 
                className="rounded-none border-0 border-b border-input shadow-none focus-visible:border-current focus-visible:ring-0 focus-visible:shadow-none" placeholder="Digite a descrição..." 
                id="description"
                {...register("description")}/>
            </Field>
          </CardDescription>
        </CardHeader>
        <Separator className="w-full" />
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" size="sm" form="text-field-form">
            Adicionar Campo
          </Button>
          <Button size="sm" variant="outline" onClick={() => onMenuSelection(null)}>
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
