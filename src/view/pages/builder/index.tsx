import { OptionsMenu } from "./components/optionsMenu";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FormSaveDialog } from "./components/saveDialog";
import { useSaveForm } from "./hooks/useSaveForm";
import { FieldCard } from "./components/fieldCard";
import { useCallback } from "react";
import { useFormBuilder } from "./hooks/useFormBuilder";

export function Builder() {
  const {
      fieldTypes,
      fields,
      selectedField,
      fieldToBuild,
      saveDialogOpen,
      handleAddField,
      handleEditField,
      handleEmptySelection,
      handleRemoveField,
      handleUpdate,
      handleMenuSelection,
      handleSaveDialogOpen,
      retrieveField,
      formId
    } = useFormBuilder();

  const { register, errors, handleSubmit } = useSaveForm({ formId: formId || "", fields: fields });

  const renderFieldCard = useCallback((fieldType: string) => {
    return (
        <FieldCard 
          fieldType={fieldType} 
          fieldTypes={fieldTypes}
          questions={fields}
          selectedField={selectedField ? selectedField : null}
          onAddField={handleAddField} 
          onMenuSelection={handleMenuSelection}
          onEmptySelection={handleEmptySelection}
          onUpdate={handleUpdate}
        /> 
      )
    }, 
    [
      fieldTypes, 
      fields, 
      selectedField, 
      handleAddField, 
      handleMenuSelection, 
      handleEmptySelection, 
      handleUpdate
    ]
  );
    
  return (
    <div className="relative flex min-h-[calc(96dvh-3rem)] flex-col">
      <section className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">  
          {
            fields.map(( field ) => {
              if (selectedField && selectedField.fieldId === field.fieldId) 
                return renderFieldCard(field.fieldType);
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
        { fieldToBuild && renderFieldCard(fieldToBuild) } 
      </section>

      <footer className="mt-auto flex justify-center py-4">
        <OptionsMenu 
          onMenuSelection={handleMenuSelection} 
          handleSaveDialogOpen={handleSaveDialogOpen} 
        />
      </footer>

      <FormSaveDialog  
        open={saveDialogOpen} 
        onDialogStatus={handleSaveDialogOpen}
        onSaveForm={handleSubmit}
        register={register}
        errors={errors}
      />
    
    </div>
  );
}
