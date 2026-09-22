import { useFields } from "@/app/hooks/useFields";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export interface IFieldOption {
  value: string;
  index: string;
  linkedToAnotherQuestion?: {
    questionId: string;
  };
}

export interface IFieldAiAnalysis {
  prompt: string;
  shouldAnalyse: boolean
}

export interface IField { 
  label: string; 
  description?: string; 
  fieldType: string, 
  fieldId: string, 
  options?: IFieldOption[]
  aiAnalysis: IFieldAiAnalysis
}

export function useFormBuilder() {

  const { retrieveField } = useFields();

  const fieldTypes = useMemo(() => [
    {value: "shortAnswer", label: "Resposta curta"},
    {value: "longAnswer", label: "Resposta longa"},
    {value: "radioSelection", label: "Seleção única"},
    {value: "checkbox", label: "Múltipla escolha"},
    {value: "selectField", label: "Campo de seleção"}
  ], []);
  
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleSaveDialogOpen = useCallback(() => {
    setSaveDialogOpen(prevState => !prevState)
  }, []);

  const { formId } = useParams<{ formId: string }>();

  const [fields, setFields] = useState<IField[]>([]);
  const [selectedField, setSelectedField] = useState<IField | null>(null);
  const [fieldToBuild, setFieldToBuild] = useState<string | null>(null);

  const handleAddField = useCallback((field: IField) => {
      setFields([...fields, field]);
    }, [fields]);
  
  const handleEditField = (fields: IField) => setSelectedField(fields);
  const handleEmptySelection = useCallback(() => setSelectedField(null), []);
  const handleRemoveField = (id: string) => setFields(prevState => prevState.filter(item => item.fieldId !== id));

  const fieldTypesWithOptions = useMemo(() => ["radioSelection", "checkbox", "selectField"], []);

  const handleUpdate = useCallback((id: string, newFields: Partial<IField>) => {
    const updateField = (field: IField): IField => {
      const updatedField = { ...field, ...newFields };
      if (
        newFields.fieldType && !fieldTypesWithOptions.includes(newFields.fieldType)
      ) {
        delete updatedField.options;
      }
      return updatedField;
    };

    setFields((prevState) =>
      prevState.map((field) =>
        field.fieldId === id ? updateField(field) : field
      )
    );

    setSelectedField((prevState) =>
      prevState && prevState.fieldId === id
        ? updateField(prevState)
        : prevState
    );
  }, [fieldTypesWithOptions]);

  const handleMenuSelection = useCallback((fieldType: string | null) => {
    setFieldToBuild(fieldType);
  }, []);
  
  return {
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
  }
}
