import { useMutation } from '@tanstack/react-query';
import { authService } from "@/app/services/authServices";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SigninParams } from "@/app/services/authServices/signIn";
import { useAuth } from "@/app/hooks/useAuth";
import { toast } from "sonner"

const schema = z.object({
  email: z.email('Informe seu e-mail válido'),
  password: z.string().min(8, 'Informe a sua senha')
})

type FormData = z.infer<typeof schema>

export function useSignIn() {

  const signIn = useAuth((state) => state.signIn) 

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
      .catch(() => {
        toast.error("Credenciais inválidas", { position: "bottom-center" })
      })
  });

  return {
    handleSubmit,
    register,
    errors,
    isPending
  }
}
