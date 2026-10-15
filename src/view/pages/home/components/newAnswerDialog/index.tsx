import { useCompany } from "@/app/hooks/useCompany";
import { useCostumers } from "@/hooks/useCostumers";
import { useForms } from "@/hooks/useForms";
import { useNavigateTo } from "@/hooks/useNavigateTo";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList, ComboboxLabel, ComboboxCollection } from "@/components/ui/combobox";
import type { ICustomer } from "@/app/services/customersServices/getCustomers";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import type { IForm } from "@/app/services/formsServices/getForms";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCustomer } from "@/app/hooks/useCustomer";
import { useShallow } from "zustand/react/shallow";

interface NewAnswerDialogProps {
  open: boolean;
  onClose: () => void;
}

export function NewAnswerDialog({ open, onClose }: NewAnswerDialogProps) {

  const { handleNavigateTo } = useNavigateTo();

  const companyId = useCompany((state) => state.companyId);
  const { customer, setCustomer } = useCustomer(
    useShallow(state => 
      ({ customer: state.customer, setCustomer: state.setCustomer })
    )
  );

  useEffect(() => {
    setCustomer(null);
  }, [setCustomer])

  const { customersData, isLoadingCustomersInfo } = useCostumers(companyId as string);
  const { formsData, isLoadingFormsInfo } = useForms(companyId as string);

  const [selectedForm, setSelectedForm] = useState<IForm | null>(null);

  const handleSelectedCustomer = (customer: ICustomer | null) => {
    setCustomer(customer);
  }

  const handleStartAnswer = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNavigateTo(`/new-answer/${selectedForm?.formId}/${crypto.randomUUID()}`);
  }

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="min-w-sm p-0">
        <form className="flex flex-col gap-y-4 p-4" id="new-answer-form" onSubmit={handleStartAnswer}>
          <DialogHeader>
            <DialogTitle>Nova Resposta</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-y-2">
            <Label>Cliente</Label>
            <div className="flex items-center gap-x-2">
              {isLoadingCustomersInfo && <Spinner data-icon="inline-start"/>}
              <Combobox 
                items={ customersData } 
                value={ customer }
                onValueChange={ handleSelectedCustomer }
                itemToStringLabel={
                  (customer: ICustomer | null) => `${customer?.fullName} - CPF: ${customer?.cpf}`
                }
              >
                <ComboboxInput placeholder="Selecione um cliente" disabled={isLoadingCustomersInfo} className="flex-1"/>
                <ComboboxContent>
                  <ComboboxEmpty>Nenhum cliente encontrado.</ComboboxEmpty>
                  <ComboboxList>
                    <ComboboxGroup>
                      <ComboboxLabel>Clientes</ComboboxLabel>
                      <ComboboxCollection>
                        {(item: ICustomer) => (
                          <ComboboxItem 
                            className="pointer-events-auto cursor-pointer" 
                            key={item.customerId} 
                            value={item}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{item.fullName}</span>
                              <span className="text-xs text-muted-foreground">CPF: {item.cpf}</span>
                            </div>
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                    </ComboboxGroup>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>
          
          <div className="flex flex-col gap-y-2">
            <Label>Formulário</Label>
            <div className="flex items-center gap-x-2">
              {isLoadingFormsInfo && <Spinner data-icon="inline-start"/>}
              <Combobox 
                items={ formsData } 
                value={ selectedForm } 
                onValueChange={(value) => { setSelectedForm(value) }}
                itemToStringLabel={(form: IForm | null) => form?.formName || ""}
                >
                <ComboboxInput placeholder="Selecione um formulário" disabled={isLoadingFormsInfo} className="flex-1"/>
                <ComboboxContent>
                  <ComboboxEmpty>Nenhum formulário encontrado.</ComboboxEmpty>
                  <ComboboxList>
                    <ComboboxGroup>
                      <ComboboxLabel>Formulários</ComboboxLabel>
                      <ComboboxCollection>
                        {(item: IForm) => (
                          <ComboboxItem 
                            className="pointer-events-auto cursor-pointer" 
                            key={item.formId} 
                            value={item}>
                            {item.formName}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                    </ComboboxGroup>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>

        </form>
        <Separator/>
        <DialogFooter className="p-2">
          <Button onClick={(e) => {
            e.preventDefault();
            setCustomer(null);
            setSelectedForm(null);
            onClose()
          }} 
          variant="destructive">Cancelar</Button>
          <Button type="submit" form="new-answer-form">
            Iniciar Resposta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
