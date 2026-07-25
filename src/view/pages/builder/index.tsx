import { useFields } from "@/app/hooks/useFields";
import { useCallback, useMemo, useState } from "react";
import { OptionsMenu } from "./components/optionsMenu";
import { TextFieldModal } from "./components/textFieldCard";

export function Builder() {

  const { retrieveField } = useFields();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<any[]>([]);
  const [fieldToBuild, setFieldToBuild] = useState<string | null>(null);

  const questionNumber = useMemo(() => (fields.length + 1).toString(), [fields.length]);
   
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddField = (field: any) => {
    setFields([...fields, {...field, questionNumber: questionNumber}]);
  };

  const handleMenuSelection = useCallback((fieldType: string | null) => {
    setFieldToBuild(fieldType);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center w-full max-w-4xl">
        <h1>Builder</h1>
        <OptionsMenu onMenuSelection={handleMenuSelection} />
      </div>

      { fieldToBuild === "shortAnswer" && 
        <TextFieldModal 
        fieldType={fieldToBuild}
        questionNumber={questionNumber} 
        onAddField={handleAddField} 
        onMenuSelection={handleMenuSelection}
        /> }

      { fieldToBuild === "longAnswer" && 
        <TextFieldModal 
        fieldType={fieldToBuild}
        questionNumber={questionNumber} 
        onAddField={handleAddField} 
        onMenuSelection={handleMenuSelection}
        /> }

      <div className="flex flex-col gap-4">  
        {
          fields.map(( field ) => {
            const FieldComponent = retrieveField(field.fieldType) as React.ElementType;
            return <FieldComponent key={field.questionNumber} {...field} />;
          })
        }
      </div> 

    </div>
  );
}
