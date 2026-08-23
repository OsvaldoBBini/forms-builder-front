import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import z from "zod"
import { useEffect } from "react"

const schema = z.object({
  label: z.string().min(1, 'Texto inválido'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ITextFieldModal {
  onCancel: () => void;
  values: { label: string; description?: string; fieldType: string, fieldId: string } | null;
  fieldType: string;
  onMenuSelection: (fieldType: string | null) => void;
  onAddField: (field: { label: string; description?: string; fieldType: string, fieldId: string }) => void;
}

export function TextFieldModal(
  { 
    fieldType, 
    onAddField, 
    onMenuSelection,
    values,
    onCancel
  }: ITextFieldModal) {

  const { handleSubmit: hookFormSubmit, register, reset } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        label: values?.label ?? "",
        description: values?.description ?? "",
      },
    });

  useEffect(() => {
    reset({
      label: values?.label ?? "",
      description: values?.description ?? "",
    });
  }, [values, reset]);

  const handleSubmit = hookFormSubmit(
    (data) => { 
      onAddField({ label: data.label, description: data.description, fieldType: fieldType, fieldId: crypto.randomUUID() });
      onMenuSelection(null);
    },
    (errors) => {
      console.error("Validation failed. Errors:", errors);
    }
  );

  return (
    <form onSubmit={handleSubmit} id="text-field-form">
      <Card size="sm" className="mx-auto w-full flex flex-col gap-2">
        <CardHeader className="p-2">
          <CardTitle className="w-full flex items-center">
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
        <Separator className="w-full mt-4" />
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" size="sm" form="text-field-form">
            Adicionar Campo
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => {
              onMenuSelection(null);
              onCancel()
            }
          }>
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
