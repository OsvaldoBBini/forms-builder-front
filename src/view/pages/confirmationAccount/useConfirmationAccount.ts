import { useAuth } from "@/app/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import type { AccountConfirmationParams } from "@/app/services/authServices/accountConfirmation";
import { authService } from "@/app/services/authServices";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { retriveToast } from "@/utils/toaster";

const schema = z.object({
  confirmationCode: z.string().min(6, 'Código invalido'),
});

type FormData = z.infer<typeof schema>;

export function useConfirmationAccount() {
  const navigate = useNavigate();
  const userEmail = useAuth((state) => state.userEmail);
  
  const { handleSubmit: hookFormSubmit, control, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmationCode: ""
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AccountConfirmation"],
    mutationFn: async (data: AccountConfirmationParams) => {
      if (userEmail) 
      return authService.accountConfirmation({ confirmationCode: data.confirmationCode, email: userEmail }) 
    }
  });

  const { mutateAsync: mutateAsyncResend, isPending: isPendingResend } = useMutation({
    mutationKey: ["ResendConfirmationCode"],
    mutationFn: async () => {
      if (userEmail) 
      return authService.resendConfirmationCode({ email: userEmail }) 
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const retriveNewConfirmationCode = async (event: any) => {
    event.preventDefault();
    await mutateAsyncResend()
      .then(
        () => retriveToast({toastType: "success", toastMessage: "Um novo código foi enviado para seu e-mail"})
      )
      .catch(
        () => retriveToast({toastType: "error", toastMessage: "Não foi possível reenviar o código de confirmação"})
    )
  }

  const handleSubmit = hookFormSubmit(
    async (data) => {
    if (userEmail)
    await mutateAsync({ confirmationCode: data.confirmationCode, email: userEmail })
      .then(() => {
        navigate("/signin")
        return retriveToast({ toastType: "success", toastMessage: "Sua conta foi validada com sucesso!!" })
      })
      .catch((err) => {
        if (err.response?.status === 411) {
          return retriveToast({toastType: "error", toastMessage: "O código informado está expirado"})
        }
        
        if (err.response?.status === 404) {
          return retriveToast({toastType: "error", toastMessage: "O código informado é inválido"})
        }

        return retriveToast({ toastType: "error", toastMessage: "Algo de errado ocorreu, tente novamente mais tarde" })
      })
  });

  return {
    control,
    errors,
    isPending,
    isPendingResend,
    handleSubmit,
    retriveNewConfirmationCode
  }

}
