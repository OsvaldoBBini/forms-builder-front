import { useAuth } from "@/app/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import type { AccountConfirmationParams } from "@/app/services/authServices/accountConfirmation";
import { authService } from "@/app/services/authServices";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  confirmationCode: z.string().min(6, 'Código invalido'),
});

type FormData = z.infer<typeof schema>;

export function ConfirmationAccount() {
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

  const handleSubmit = hookFormSubmit(
    async (data) => {
    if (userEmail)
    await mutateAsync({ confirmationCode: data.confirmationCode, email: userEmail })
      .then(() => navigate("/signin"))
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

  return (
    <form onSubmit={handleSubmit}>
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Confirme sua conta</CardTitle>
          <CardDescription>
            Insira seu código de confirmação
          </CardDescription>
        </CardHeader>

          <CardContent>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="otp-verification">
                  Código de confirmação
                </FieldLabel>
              </div>

              <div className="flex w-full justify-center">
                <Controller
                  name="confirmationCode"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputOTP 
                      maxLength={6} 
                      id="otp-verification" 
                      value={field.value}
                      onChange={field.onChange}
                      required
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} aria-invalid={!!errors.confirmationCode}/>
                        <InputOTPSlot index={1} aria-invalid={!!errors.confirmationCode}/>
                        <InputOTPSlot index={2} aria-invalid={!!errors.confirmationCode}/>
                        <InputOTPSlot index={3} aria-invalid={!!errors.confirmationCode}/>
                        <InputOTPSlot index={4} aria-invalid={!!errors.confirmationCode}/>
                        <InputOTPSlot index={5} aria-invalid={!!errors.confirmationCode}/>
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>

                <div className="text-center text-sm">
                  {errors.confirmationCode && <p className="text-red-500 text-sm mt-2">{errors.confirmationCode.message}</p>}
                </div>
              
            </Field>
          </CardContent>
          <CardFooter>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner data-icon="inline-start"/>}
                Confirmar
              </Button>
            </Field>
          </CardFooter>
      </Card>
    </form>
  )
}
