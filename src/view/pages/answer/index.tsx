/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCompany } from "@/app/hooks/useCompany";
import { useCustomer } from "@/app/hooks/useCustomer";
import { useFields } from "@/app/hooks/useFields";
import { getFields } from "@/app/services/formsServices/getFields";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export function Answer() {

  const companyId = useCompany((state) => state.companyId);

  const { formId, answerId } = useParams<{ formId: string; answerId: string }>();
  const { retrieveField } = useFields();
  const { customer } = useCustomer(useShallow(state => ({ customer: state.customer })));

  const { data: formFields, isLoading: isLoadingFields } = useQuery({
    queryKey: ['getFields'],
    queryFn: () => getFields(companyId as string, formId as string),
  });

  console.log({ isLoadingFields, formFields, customer });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Respostas</h1>

      {customer && (
        <div>
          <p>Cliente: {customer.fullName}</p>
          <p>CPF: {customer.cpf}</p>
        </div>
      )}

      <form className="flex flex-col gap-4">
        {formFields && formFields.map((field: any) => {
          const FieldComponent = retrieveField(field.fieldType) as React.ElementType;
          return (
            <Card key={field.fieldId}>
              <CardContent>
                <FieldComponent {...field} />
              </CardContent>
            </Card>
          )
        })}
      </form>

    </div>
  )
}
