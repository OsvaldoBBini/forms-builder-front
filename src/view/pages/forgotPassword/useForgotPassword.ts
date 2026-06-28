import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import z from "zod";
import { retriveToast } from "@/utils/toaster";
import type { ForgotPasswordParams } from "@/app/services/authServices/forgotPassword";
import { authService } from "@/app/services/authServices";

const schema = z.object({
  email: z.email('E-mail inválido')
});

type FormData = z.infer<typeof schema>;

export function useForgotPassword() {
  const navigate = useNavigate();
  
  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
      resolver: zodResolver(schema),
    });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["ForgotPassword"],
    mutationFn: async (data: ForgotPasswordParams) => {
      return authService.forgotPassword({ email: data.email });
    }
  });

  const handleSubmit = hookFormSubmit(
    async (data) => {
    await mutateAsync({email: data.email})
      .then(
        () => {
          navigate("/signin") 
          return retriveToast({ toastType: "success", toastMessage: "Você receberá um e-mail para redefinição de sua senha" })
        }
      )
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
    errors,
    isPending,
    register,
    handleSubmit,
  }

}
