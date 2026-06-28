import { useMutation } from '@tanstack/react-query';
import { authService } from "@/app/services/authServices";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SigninParams } from "@/app/services/authServices/signIn";
import { useAuth } from "@/app/hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { retriveToast } from '@/utils/toaster';

const schema = z.object({
  email: z.email('E-mail válido'),
  password: z.string().min(8, 'Senha inválida')
})

type FormData = z.infer<typeof schema>

export function useSignIn() {

  const navigate = useNavigate();

  const signIn = useAuth((state) => state.signIn); 
  const storeUserEmail = useAuth((state) => state.storeUserEmail); 
  const userEmail = useAuth((state) => state.userEmail); 

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: userEmail ? userEmail : ""
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: SigninParams) => { return authService.signIn(data) }
  });

  const handleSubmit = hookFormSubmit(
    async (data) => {
    await mutateAsync(data)
      .then(({accessToken, refreshToken}) => { 
        storeUserEmail(data.email);
        signIn(accessToken, refreshToken) })
      .catch((err) => {
        storeUserEmail(data.email);
          
        if (err.response?.status === 401) {
          return retriveToast({toastType: "error", toastMessage: "E-mail ou senha incorretos"})
        }
        
        if (err.response?.status === 403) {
          navigate("/account-confirmation")
          return retriveToast({ toastType: "error", toastMessage: "Validação de conta necessária para acesso" })
        }
        
        if (err.response?.status === 404) {
          return retriveToast({ toastType: "error", toastMessage: "Usuário não encontrado" })
        }
      })
  });

  return {
    handleSubmit,
    register,
    errors,
    isPending
  }
}
