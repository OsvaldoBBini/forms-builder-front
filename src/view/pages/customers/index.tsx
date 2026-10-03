import { EmptyCustomers } from "./components/emptyCustomers";
import { useCallback, useState } from "react";
import { InitialLoader } from "@/components/loaders/initialLoader";
import { CustomersTable } from "./components/customersTable";
import { type ICustomer } from "@/app/services/customersServices/getCustomers";
import { useCompany } from "@/app/hooks/useCompany";
import { CustomersDialog } from "./components/customersDialog";
import { useCostumers } from "@/hooks/useCostumers";
import { Header } from "@/components/header";


export function Customers () {

  const companyId = useCompany((state) => state.companyId);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<undefined | ICustomer>(undefined);

  const { customersData, isLoadingCustomersInfo } = useCostumers(companyId as string);
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
    <Header title="Clientes"/>
    <section className="pt-1">
      { isLoading && <InitialLoader customText="Estamos carregando seus clientes"/>}
      { customersData?.length === 0 && !isLoading && <EmptyCustomers onOpenModal={handleModalStatus}/>}
      { 
        !isLoading && customersData && customersData?.length > 0 &&  
        <CustomersTable 
          handleModalStatus={handleModalStatus}
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

