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
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner";
import { XCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "./useForgotPassword";


export function ForgotPassword() {
  const { handleSubmit, register, errors, isPending } = useForgotPassword();

  return (
    <form onSubmit={handleSubmit}>
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Esqueceu a sua senha?</CardTitle>
          <CardDescription>
            Insira o seu e-mail cadastrado na plataforma
          </CardDescription>
        </CardHeader>

          <CardContent>
            <Field>
              <div className="flex w-full justify-center">
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="e-mail">E-mail:</FieldLabel>
                  <Input 
                    id="e-mail" 
                    type="E-mail" 
                    aria-invalid={!!errors.email} 
                    {...register("email")}/>
                  {errors.email?.message && (
                    <FieldError className="text-red-600 flex items-center gap-x-1"> 
                      <XCircleIcon size={10}/>
                      {errors.email?.message}
                    </FieldError>
                  )}
                </Field>
              </div>
            </Field>
          </CardContent>
          <CardFooter>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner data-icon="inline-start"/>}
                Enviar código
              </Button>
            </Field>
          </CardFooter>
      </Card>
    </form>
  )
}
