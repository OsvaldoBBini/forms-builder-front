import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import z from "zod"
import { useEffect } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  label: z.string().min(1, 'Texto inválido'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface IFieldCard {
  selectedField: { label: string; description?: string; fieldType: string, fieldId: string } | null;
  fieldTypes: { value: string, label: string }[];
  onCancel: () => void;
  fieldType: string;
  onMenuSelection: (fieldType: string | null) => void;
  onAddField: (field: { label: string; description?: string; fieldType: string, fieldId: string }) => void;
}

export function FieldCard(
  { 
    fieldTypes,
    fieldType, 
    onAddField, 
    onMenuSelection,
    selectedField,
    onCancel
  }: IFieldCard) {

  const { handleSubmit: hookFormSubmit, register, reset } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        label: selectedField?.label ?? "",
        description: selectedField?.description ?? "",
      },
    });

  useEffect(() => {
    reset({
      label: selectedField?.label ?? "",
      description: selectedField?.description ?? "",
    });
  }, [selectedField, reset]);

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
        <CardFooter className={`flex  ${ selectedField ? "justify-between" : "justify-end" }`}>

          {selectedField && 
            <Select defaultValue={fieldType} onValueChange={() => console.log}>
              <SelectTrigger>
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipos</SelectLabel>
                  {fieldTypes.map((item, index) => (
                    <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          }

          <div className="flex gap-2">
            <Button type="submit" size="sm" form="text-field-form">
              { !selectedField ? "Adicionar": "Atualizar" }
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
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
