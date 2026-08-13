import { Separator } from "@/components/ui/separator";
import { EmptyCustomers } from "./components/emptyCustomers";
import { useCallback, useState } from "react";
import { InitialLoader } from "@/components/loaders/initialLoader";
import { Button } from "@/components/ui/button";
import { CustomersTable } from "./components/customersTable";
import { getCustomers, type ICustomer } from "@/app/services/customersServices/getCustomers";
import { useQuery } from "@tanstack/react-query";
import { useCompany } from "@/app/hooks/useCompany";
import { CustomersDialog } from "./components/customersDialog";


export function Customers () {

  const companyId = useCompany((state) => state.companyId);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<undefined | ICustomer>(undefined);

  const { data: customersData, isLoading: isLoadingCustomersInfo } = useQuery({
    queryKey: ['getCustomers', companyId],
    queryFn: () => getCustomers(companyId as string),
  });

  const isLoading = isLoadingCustomersInfo;

  const handleCleanSelectedCustomer = useCallback(
    () => {
      setSelectedCustomer(undefined);
    }, 
  []);

  const handleModalStatus = useCallback(
    () => {
      setIsOpen(prevState => !prevState);
    }, 
  []);

  const handleSelectedCustomer = useCallback(
    (customer: ICustomer | undefined) => {
      setSelectedCustomer(customer);
      handleModalStatus();
    },
  [handleModalStatus]);

  return (
    <>
    <header className="flex justify-between items-center pb-1">
      <h1>Clientes</h1>
      { customersData && customersData?.length > 0 && 
        <Button onClick={handleModalStatus}>
          Cadastrar cliente
        </Button>
      }
    </header>
    <Separator/>
    <section className="pt-1">
      { isLoading && <InitialLoader customText="Estamos carregando seus clientes"/>}
      { customersData?.length === 0 && !isLoading && <EmptyCustomers onOpenModal={handleModalStatus}/>}
      { 
        customersData && customersData?.length > 0 && !isLoading && 
        <CustomersTable 
          handleSelectedCustomer={handleSelectedCustomer} 
          customers={customersData} 
        /> 
      }

      <CustomersDialog
        companyId={companyId as string}
        open={isOpen}
        customer={selectedCustomer}
        onDialogStatus={handleModalStatus}
        onEmptyCustomer={handleCleanSelectedCustomer}
      />

    </section>
    </>
  )
}
