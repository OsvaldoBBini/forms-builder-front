/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCompany } from "@/app/hooks/useCompany";
import { useCustomer } from "@/app/hooks/useCustomer";
import { useFields } from "@/app/hooks/useFields";
import { getFields } from "@/app/services/formsServices/getFields";
import type { FormValues } from "@/components/forms/type";
import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Button } from "@base-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BookUser } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import type { IField, IFieldOption } from "../builder/hooks/useFormBuilder";

export function Answer() {
  const { retrieveField } = useFields();
  const companyId = useCompany((state) => state.companyId);
  const { formId, answerId } = useParams<{ formId: string; answerId: string }>();
  const { customer } = useCustomer(useShallow(state => ({ customer: state.customer })));

  const { data: formFields, isLoading: isLoadingFields } = useQuery({
    queryKey: ['getFields', companyId, formId],
    queryFn: () => getFields(companyId as string, formId as string),
    enabled: Boolean(companyId && formId),
  });

  const dependency = useMemo(() => { return formFields && formFields.flatMap((field: IField) => 
    { 
      const haveDependency = (field.options ?? []).flatMap((option: IFieldOption) => {
       const dependentFileId = option?.linkedToAnotherQuestion?.fieldId
       return dependentFileId ? [{ ...option, fieldId: field.fieldId }] : []
      });
      return haveDependency
    }
  )
  }, [formFields]);

  
  const { register, control, handleSubmit: hookFormSubmit } = useForm<FormValues>({
    defaultValues: { answers: {} }
  });
  
  const handleSubmit = hookFormSubmit(async (data: FormValues) => {
    console.log({data, answerId});
  })
  
  const answers = useWatch({
    control,
    name: "answers",
  });

  const handleDisabled = useCallback((field: any) => {
    const hasFileId = dependency.find((item: any) => item.linkedToAnotherQuestion?.fieldId === field.fieldId)

    const currentAnswer = hasFileId && answers[hasFileId.fieldId]
    const unlockFieldAnswer = hasFileId && hasFileId.value
    
    return currentAnswer !== unlockFieldAnswer
  }, [dependency, answers])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Respostas</h1>

      {customer && (
        <Item variant="muted" size="xs">
          <ItemMedia variant="icon">
            <BookUser />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Cliente selecionado</ItemTitle>
            <ItemDescription>
              <span>
                {customer.fullName} CPF: {customer.cpf}
              </span>
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      <form className="flex flex-col gap-4" id="answer" onSubmit={handleSubmit}>
        {formFields && formFields.map((field: any) => {
          const FieldComponent = retrieveField(field.fieldType) as React.ElementType;

          const isDisabled = handleDisabled(field)
          
          return (
            <Card key={field.fieldId}>
              <CardContent>
                <FieldComponent 
                  {...field} 
                  name={`answers.${field.fieldId}`} 
                  register={register} 
                  control={control}
                  disabled={isDisabled} 
                />
              </CardContent>
            </Card>
          )
        })}
        <Button type="submit">Salvar</Button>
      </form>

    </div>
  )
}
