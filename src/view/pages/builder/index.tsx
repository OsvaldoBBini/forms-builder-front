import { useFields } from "@/app/hooks/useFields";
import { useState } from "react";
import { OptionsMenu } from "./components/optionsMenu";
import { TextFieldModal } from "./components/textFieldModal";

export function Builder() {

  const { retrieveField } = useFields();

  // const forms = [
  //   { questionNumber: "1", fieldType: "shortAnswer", label: "Qual é seu nome?" },
  //   { questionNumber: "2", fieldType: "longAnswer", label: "Descreva seu histórico profissional" },
  //   { questionNumber: "3", 
  //     fieldType: "radioSelection", 
  //     label: "Selecione sua idade:", 
  //     options: [
  //       { value: "18-25" },
  //       { value: "26-35" },
  //       { value: "36-45" },
  //       { value: "46+" }
  //     ]
  //   },
  // ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddField = (field: any) => {
    setFields([...fields, {...field, questionNumber: (fields.length + 1).toString()}]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl p-4">

      <div className="flex justify-between items-center w-full max-w-4xl">
        <h1>Builder</h1>
        <OptionsMenu onOpenModal={() => setIsModalOpen(true)} />
      </div>

      <TextFieldModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddField={handleAddField}/>

      <div className="flex flex-col gap-4">  
        {
          fields.map(( field ) => {
            const FieldComponent = retrieveField(field.fieldType) as React.ElementType;
            return <FieldComponent key={field.questionNumber} {...field} />;
          })
        }
      </div> 

      {/* <FormsTextField 
        questionNumber="1" 
        label="Qual o seu nome?" 
        size="small"/>

      <FormsTextField 
        questionNumber="2" 
        label="Qual o seu nome?" 
        size="large"/>

      <FormsRadioSelection 
        questionNumber="3"
        label="Selecionar"
        options={[
          {value: "selecao1"},
          {value: "selecao2"},
        ]}
      />

      <FormsCheckbox
        questionNumber="4"
        label="Selecionar"
        options={[
          {value: "selecao1"},
          {value: "selecao2"},
        ]}
      />

      <FormsSelectField 
        questionNumber="5" 
        label="Selecao"
        description="Selecione uma opção"
        defaultValue="opcao1"
        options={[
          {value: "opcao1"},
          {value: "opcao2"},
        ]}
      /> */}

    </div>
  );
}
