import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import z from "zod"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Circle, MoreVertical, Square } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { IField, IFieldOption } from ".."

const schema = z.object({
  label: z.string().min(1, 'Texto inválido'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface IFieldCard {
  selectedField: IField | null;
  questions: IField[];
  fieldTypes: { value: string, label: string }[];
  onEmptySelection: () => void;
  fieldType: string;
  onMenuSelection: (fieldType: string | null) => void;
  onAddField: (field: IField) => void;
  onUpdate: (id: string, newFields: Partial<IField>) => void;
}

export function FieldCard(
  { 
    fieldTypes,
    fieldType,
    questions, 
    onAddField, 
    onMenuSelection,
    selectedField,
    onEmptySelection,
    onUpdate
  }: IFieldCard) {

  const [options, setOptions] = useState<IFieldOption[]>(
    selectedField?.options || [{ value: "Opção 1", index: crypto.randomUUID() }]
  );

  const [linkedToAnotherQuestion, setLinkedToAnotherQuestion] = useState( selectedField?.options?.some(option => option.linkedToAnotherQuestion) || false);

  const handleToggleLinkedQuestion = () => {
    setLinkedToAnotherQuestion(prevState => !prevState);
  }

  const handleUpdateOption = (index: string, newValue: string) => {
    setOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      const oldValue = updatedOptions.find(option => option.index === index);
      if (oldValue) {
        updatedOptions[updatedOptions.indexOf(oldValue)] = { ...oldValue, value: newValue };
      }
      return updatedOptions;
    });
  }

  const handleLinkQuestion = (optionIndex: string, questionId: string) => {
    setOptions(prevOptions => prevOptions.map(option =>
      option.index === optionIndex
        ? { ...option, linkedToAnotherQuestion: { questionId } }
        : option
    ));
  }

  const handleAddOption = () => {
    setOptions(prevOptions => [...prevOptions, { value: `Opção ${prevOptions.length + 1}`, index: crypto.randomUUID() }]);
  }

  const handleRemoveOption = (index: string) => {
    setOptions(prevOptions => prevOptions.filter(option => option.index !== index));
  }

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
      const haveOptions = ["radioSelection", "checkbox", "selectField"].includes(fieldType) ? { options } : {};

      if (selectedField) {
        onUpdate(selectedField.fieldId, { label: data.label, description: data.description, fieldType: fieldType, ...haveOptions });
        onEmptySelection();
      }

      else {
        onAddField({ label: data.label, description: data.description, fieldType: fieldType, fieldId: crypto.randomUUID(), ...haveOptions });
        onMenuSelection(null);
      }

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
        
        { !["shortAnswer", "longAnswer"].includes(fieldType) &&
          <CardContent className="flex flex-col gap-2">

            {options.map((option, index) => (
              <div className="flex justify-center items-center gap-2" key={option.index}>
                  { fieldType === "radioSelection" && <Circle className="size-4 shrink-0" />}
                  { fieldType === "checkbox" && <Square className="size-4 shrink-0" />}
                  { fieldType === "selectField" && <span>{index + 1}.</span> }
                  
                  <Field >
                    <Input 
                        className="rounded-none border-0 border-b border-input shadow-none focus-visible:border-current focus-visible:ring-0 focus-visible:shadow-none"
                        defaultValue={option.value}
                        onChange={(e) => handleUpdateOption(option.index, e.target.value)}
                        id={`option-${option.index}`}
                        placeholder="Digite a opção de resposta..." />
                  </Field>

                  { linkedToAnotherQuestion && (
                    <div className="flex items-center gap-2">
                      <Select
                        value={option.linkedToAnotherQuestion?.questionId}
                        onValueChange={(questionId) => handleLinkQuestion(option.index, questionId)}
                      >
                        <SelectTrigger className="w-sm">
                          <SelectValue placeholder="Habilitar pergunta..." />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectGroup>
                            <SelectLabel>Perguntas</SelectLabel>
                              {questions.map((item) => (
                                <SelectItem key={item.fieldId} value={item.fieldId}>
                                  {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                
                  { options.length > 1 && 
                    <div>
                      <Button variant="destructive" size="sm" onClick={(e) => { e.preventDefault(); handleRemoveOption(option.index)}}>
                        Remover
                      </Button>
                    </div>
                  }
                </div>
            ))}

            <div className="flex justify-start items-center gap-2">
              { fieldType === "radioSelection" && <Circle className="size-4" />}
              { fieldType === "checkbox" && <Square className="size-4" />}

              <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); handleAddOption()}}>
                Adicionar Opção
              </Button>

            </div>

          </CardContent>
        }
        <Separator className="w-full mt-4" />
        <CardFooter className={`flex ${selectedField ? 'justify-between' : 'justify-end'} items-center`}>
           { 
            selectedField && 
            <Select defaultValue={fieldType} onValueChange={(value) => onUpdate(selectedField?.fieldId || '', { fieldType: value })}>
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
                onEmptySelection();
              }
            }>
              Cancelar
            </Button>

            {!["shortAnswer", "longAnswer"].includes(fieldType) &&
              <>
                <Separator orientation="vertical" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full" side="bottom" align="end">
                    <DropdownMenuCheckboxItem 
                        checked={linkedToAnotherQuestion} 
                        onCheckedChange={handleToggleLinkedQuestion}>
                      Ir para pergunta com base na resposta
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            }
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
