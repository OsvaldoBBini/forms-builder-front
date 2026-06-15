import { useMutation } from '@tanstack/react-query';
import { authService } from "@/app/services/authServices";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SigninParams } from "@/app/services/authServices/signIn";
import { useAuth } from "@/app/hooks/useAuth";
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.email('Informe seu e-mail válido'),
  password: z.string().min(8, 'Informe a sua senha')
})

type FormData = z.infer<typeof schema>

export function useSignIn() {

  const navigate = useNavigate();

  const signIn = useAuth((state) => state.signIn); 

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: SigninParams) => { return authService.signIn(data) }
  });

  const handleSubmit = hookFormSubmit( async (data) => {
    await mutateAsync(data)
      .then(({accessToken, refreshToken}) => { signIn(accessToken, refreshToken) })
      .catch((err) => {
        if (err.response?.status === 401) {
          return toast.error("E-mail ou senha incorretos", { position: "bottom-center" })
        }
        
        if (err.response?.status === 403) {
          navigate("/account-confirmation")
          return toast.error("Validação de conta necessária para acesso", { position: "bottom-center" })
        }

        if (err.response?.status === 404) {
          return toast.error("Usuário não encontrado", { position: "bottom-center" })
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
