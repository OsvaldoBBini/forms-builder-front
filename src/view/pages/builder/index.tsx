/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFields } from "@/app/hooks/useFields";
import { useCallback, useState } from "react";
import { OptionsMenu } from "./components/optionsMenu";
import { FieldCard } from "./components/fieldCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useParams } from "react-router-dom";


export function Builder() {

  const { retrieveField } = useFields();

  const fieldTypes = [
    {value: "shortAnswer", label: "Resposta curta"},
    {value: "longAnswer", label: "Resposta longa"},
    {value: "radioSelection", label: "Seleção única"},
    {value: "checkbox", label: "Múltipla escolha"},
    {value: "selectField", label: "Campo de seleção"}
  ]

  const { formId } = useParams<{ formId: string }>();

  const [fields, setFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<any | null>(null);
  const [fieldToBuild, setFieldToBuild] = useState<string | null>(null);
   
  const handleAddField = (field: any) => {
    setFields([...fields, field]);
  };

  const handleEditField = (fields: any) => setSelectedField(fields);

  const handleEmptySelection = useCallback(() => setSelectedField(null), []);

  const handleRemoveField = (id: string) => setFields(prevState => prevState.filter(item => item.fieldId !== id));

  const handleUpdate = useCallback((id: string, newFields: any) => {
    setFields((prevState) => prevState.map((item) =>
      item.fieldId === id ? { ...item, ...newFields } : item
    ));

    setSelectedField((prevState: any) =>
      prevState && prevState.fieldId === id ? { ...prevState, ...newFields } : prevState
    );
  }, []);

  const handleMenuSelection = useCallback((fieldType: string | null) => {
    setFieldToBuild(fieldType);
  }, []);

  return (
    <div className="relative min-h-[calc(96dvh-3rem)]">
      <section className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">  
          {
            fields.map(( field ) => {
              if (selectedField && selectedField.fieldId === field.fieldId) 
                return (
                  <FieldCard 
                    fieldType={field.fieldType} 
                    fieldTypes={fieldTypes}
                    selectedField={selectedField}
                    onAddField={handleAddField} 
                    onMenuSelection={handleMenuSelection}
                    onEmptySelection={handleEmptySelection}
                    onUpdate={handleUpdate}
                    />
                );
              else {
                const FieldComponent = retrieveField(field.fieldType) as React.ElementType;
                return (
                  <Card className="w-full gap-0 py-0" key={field.fieldId}>
                    <CardContent className="m-4">
                      <FieldComponent {...field} />
                    </CardContent>
                    <Separator className="w-full" />
                    <CardFooter className="flex justify-end pt-2 pb-2 gap-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" onClick={() => handleEditField(field)}>
                            <Pencil />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar</p>
                        </TooltipContent>
                      </Tooltip>
  
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="destructive" onClick={() => handleRemoveField(field.fieldId)}>
                            <Trash />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Excluir</p>
                        </TooltipContent>
                      </Tooltip>
                    </CardFooter>
                  </Card>
                );}
            })
          }
        </div> 
        { fieldToBuild && 
          <FieldCard 
            fieldType={fieldToBuild} 
            fieldTypes={fieldTypes}
            selectedField={null}
            onAddField={handleAddField} 
            onMenuSelection={handleMenuSelection}
            onEmptySelection={handleEmptySelection}
            onUpdate={handleUpdate}
            /> 
        }
      </section>

      <footer className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <OptionsMenu onMenuSelection={handleMenuSelection} />
      </footer>
    
    </div>
  );
}
