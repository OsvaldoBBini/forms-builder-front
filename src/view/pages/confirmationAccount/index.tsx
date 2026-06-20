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
import { Spinner } from "@/components/ui/spinner";
import { useConfirmationAccount } from "./useConfirmationAccount";
import { RefreshCwIcon } from "lucide-react";


export function ConfirmationAccount() {
  const { handleSubmit, control, errors, isPending, isPendingResend, retriveNewConfirmationCode } = useConfirmationAccount();

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
                  Código de verificação
                </FieldLabel>
                <Button 
                  disabled={isPendingResend} 
                  variant="outline" 
                  size="xs" 
                  onClick={retriveNewConfirmationCode}>
                  {isPendingResend && <Spinner data-icon="inline-start"/>}
                  {!isPendingResend && <RefreshCwIcon />}
                  Reenviar código
                </Button>
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
