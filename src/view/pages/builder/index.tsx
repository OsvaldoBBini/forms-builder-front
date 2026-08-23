/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFields } from "@/app/hooks/useFields";
import { useCallback, useState, type ReactNode } from "react";
import { OptionsMenu } from "./components/optionsMenu";
import { TextFieldModal } from "./components/textFieldCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Builder() {

  const { retrieveField } = useFields();

  const [fields, setFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<any | null>(null);
  const [fieldToBuild, setFieldToBuild] = useState<string | null>(null);
   
  const handleAddField = (field: any) => {
    setFields([...fields, field]);
  };

  const handleEditField = (fields: any) => setSelectedField(fields);

  const handleEmptySelection = useCallback(() => setSelectedField(null), []);

  const handleRemoveField = (id: string) => setFields(prevState => prevState.filter(item => item.fieldId !== id));

  const handleMenuSelection = useCallback((fieldType: string | null) => {
    setFieldToBuild(fieldType);
  }, []);

  const factory = (fieldToBuild: any): ReactNode => {
    const buildOptions: any = {
      shortAnswer: <TextFieldModal 
        fieldType={fieldToBuild} 
        values={selectedField}
        onAddField={handleAddField} 
        onMenuSelection={handleMenuSelection}
        onCancel={handleEmptySelection}/>,

      longAnswer: <TextFieldModal 
        fieldType={fieldToBuild} 
        values={selectedField}
        onAddField={handleAddField} 
        onMenuSelection={handleMenuSelection}
        onCancel={handleEmptySelection}/>
    } 
    return buildOptions[fieldToBuild]
  }

  return (
    <div>
      <div className="flex justify-between items-center w-full max-w-4xl">
        <h1>Builder</h1>
        <OptionsMenu onMenuSelection={handleMenuSelection} />
      </div>

      <section className="flex flex-col gap-y-4">
        { factory(fieldToBuild) }
        <div className="flex flex-col gap-y-4">  
          {
            fields.map(( field ) => {
              if (selectedField && selectedField.fieldId === field.fieldId) return factory(field.fieldType)
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
      </section>
    </div>
  );
}
