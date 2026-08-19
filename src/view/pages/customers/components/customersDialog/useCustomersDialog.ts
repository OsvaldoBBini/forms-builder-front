import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { retriveToast } from "@/utils/toaster"
import type { INewCustomer } from "@/app/services/customersServices/createCustomers"
import { customersServices } from "@/app/services/customersServices"
import type { ICustomer } from "@/app/services/customersServices/getCustomers"
import { useEffect } from "react"
import type { IUpdateCustomer } from "@/app/services/customersServices/updateCustomers"

interface CompanyDialogInterface {
  companyId: string;
  customer?: ICustomer;
  onDialogStatus: () => void;
  onEmptyCustomer: () => void;
}

const schema = z.object({
  fullName: z.string()
    .min(1, 'O nome completo deve ter pelo menos uma letra')
    .max(100, 'O nome completo deve ter no máximo 100 letras'),
  email: z.email('Formato de email inválido').optional(),
  cpf: z.string().regex(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/, 'Formato de CPF inválido'),
  phoneNumber: z.string().regex(/^(?:\(?([1-9]{2})\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/, 'Formato de número de telefone inválido')
})

type FormData = z.infer<typeof schema>

const defaultValues = {
  fullName: "",
  email: "",
  cpf: "",
  phoneNumber: ""
}

export function useCustomersDialog({ 
  companyId,
  customer,
  onDialogStatus,
  onEmptyCustomer
}: CompanyDialogInterface) {

  const queryClient = useQueryClient();
  
  const { 
    handleSubmit: hookFormSubmit, register, reset, formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  useEffect(() => {
    reset({
      fullName: customer?.fullName ?? "",
      email: customer?.email ?? "",
      cpf: customer?.cpf ?? "",
      phoneNumber: customer?.phoneNumber ?? ""
    })
  }, [customer, reset])

  const { mutateAsync: createCustomer, isPending: isCreating } = useMutation({
    mutationKey: ["createCustomer"],
    mutationFn: async (data: INewCustomer) => { return customersServices.createCustomers(companyId, { ...data }) }
  });

  const { mutateAsync: updateCustomer, isPending: isUpdating } = useMutation({
    mutationKey: ["updateCustomer"],
    mutationFn: async (data: IUpdateCustomer) => { return customersServices.updateCustomers(companyId, { ...data }) }
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      if (customer) {
        await updateCustomer({ ...data, customerId: customer.customerId });
        await queryClient.invalidateQueries({queryKey: ['getCustomers']});
        return retriveToast({
          toastType: "success",
          toastMessage: "Cliente atualizado com sucesso"
        }) 
      }

      await createCustomer(data);
      await queryClient.invalidateQueries({queryKey: ['getCustomers']});
      return retriveToast({
        toastType: "success",
        toastMessage: "Cliente cadastrado com sucesso"
      }) 
    }
    catch {
      return retriveToast({
        toastType: "error",
        toastMessage: "Erro ao cadastrar seu cliente. Tente novamente mais tarde"
      })
    } finally {
      reset(defaultValues)
      onDialogStatus();
      onEmptyCustomer();
    }
  });

  const handleClose = () => {
    reset(defaultValues)
    onDialogStatus() 
    onEmptyCustomer()
  };

  const isPending = isCreating || isUpdating;

  return {
    handleSubmit,
    register,
    errors,
    handleClose,
    open,
    isPending,
  }
}
