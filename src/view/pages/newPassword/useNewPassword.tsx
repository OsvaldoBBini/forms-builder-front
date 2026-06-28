import z from "zod";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { retriveToast } from "@/utils/toaster";
import { useParams } from "react-router-dom";
import type { ResetPasswordParams } from "@/app/services/authServices/resetPassword";
import { authService } from "@/app/services/authServices";

const schema = z.object({
  password: z.string()
    .min(8, {message: 'A senha deve conter pelo menos 8 caracteres.'})
    .max(20, {message: 'A senha deve conter no máximo 20 caracteres.'})
    .regex(
      /(?=.*[A-Z])/, 
      { message: 'A senha deve conter pelo menos uma letra maiúscula.' }
    )
    .regex(
      /(?=.*[0-9])/,
      { message: 'A senha deve conter pelo menos um número.' }
    )
    .regex(
      /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, 
      { message: 'A senha deve conter pelo menos um caractere especial.' }
    ),
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não são iguais!",
    path: ["confirmPassword"],
  }
)

type FormData = z.infer<typeof schema>

export function useNewPassword() {

  const { email, code } = useParams();

  const navigate = useNavigate(); 
  const storeUserEmail = useAuth((state) => state.storeUserEmail); 

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["newPassword"],
    mutationFn: async (data: ResetPasswordParams) => { 
      return authService.resetPassword({...data})
     }
  });

  const handleSubmit = hookFormSubmit( async (data) => {
    if (email && code)
    await mutateAsync({email: email, confirmationCode: code, newPassword: data.password})
      .then(() => {   
        storeUserEmail(email);
        navigate("/signin") 
        return retriveToast({ toastType: "success", toastMessage: "Sua senha foi alterada com sucesso!!" })
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
    handleSubmit,
    register,
    errors,
    isPending
  }

}
