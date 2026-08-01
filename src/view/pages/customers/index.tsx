import { Separator } from "@/components/ui/separator";
import { EmptyCustomers } from "./components/emptyCustomers";
import { useCallback, useState } from "react";
import { InitialLoader } from "@/components/loaders/initialLoader";
import { Button } from "@/components/ui/button";
import { CustomersTable } from "./components/customersTable";

export interface ICustomer {
  email: string;
  phoneNumber: string;
  fullName: string;
  cpf: string;
}

export function Customers () {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const customers: ICustomer[] | null = null;
  const customers: ICustomer[] | null = [{
    email: "osvaldobbini@gmail.com",
    phoneNumber: "55984632951",
    fullName: "Osvaldo Bini",
    cpf: "05078886001"
  }];

  const isLoading = false;

  const handleModalStatus = useCallback(
    () => setIsOpen(prevState => !prevState), 
  []);

  console.log({isOpen});
    
  return (
    <>
    <header className="flex justify-between items-center pb-1">
      <h1>Clientes</h1>
      { customers && <Button>Cadastrar cliente</Button>}
    </header>
    <Separator/>
    <section className="pt-1">
      { isLoading && <InitialLoader customText="Estamos carregando seus clientes"/>}
      { !customers && !isLoading && <EmptyCustomers onOpenModal={handleModalStatus}/>}
      { customers && !isLoading && <CustomersTable customers={customers} /> }
    </section>
    </>
  )
}
