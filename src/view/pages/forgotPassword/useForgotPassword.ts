import { useAuth } from "@/app/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import z from "zod";
import { retriveToast } from "@/utils/toaster";

const schema = z.object({
  email: z.email('E-mail inválido')
});

type FormData = z.infer<typeof schema>;

export function useForgotPassword() {
  const navigate = useNavigate();
  const userEmail = useAuth((state) => state.userEmail);
  
  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        email: userEmail ? userEmail : ""
      }
    });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["ForgotPassword"],
    mutationFn: async () => {
      return 
    }
  });

  const handleSubmit = hookFormSubmit(
    async () => {
    await mutateAsync()
      .then(() => navigate("/change-password"))
      // .catch((err) => {
      //   if (err.response?.status === 411) {
      //     return retriveToast({toastType: "error", toastMessage: "O código informado está expirado"})
      //   }
        
      //   if (err.response?.status === 404) {
      //     return retriveToast({toastType: "error", toastMessage: "O código informado é inválido"})
      //   }
      // })
  });

  return {
    errors,
    isPending,
    register,
    handleSubmit,
  }

}
