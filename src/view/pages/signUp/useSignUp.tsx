import z from "zod";
import { useMutation } from '@tanstack/react-query';
import { authService } from "@/app/services/authServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { type SignUpParams } from "@/app/services/authServices/signUp";
import { useAuth } from "@/app/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  fullName: z.string().min(2, 'Informe seu nome completo'),
  email: z.email('Informe seu e-mail válido'),
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
});

type FormData = z.infer<typeof schema>

export function useSignUp() {

  const navigate = useNavigate();
  const storeUserId = useAuth((state) => state.storeUserId); 

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (data: SignUpParams) => { return authService.signUp(data) }
  });

  const handleSubmit = hookFormSubmit( async (data) => {
    await mutateAsync(data)
      .then(({ userId }) => {   
        storeUserId(userId);
        navigate("/account-confirmation") 
      })
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
