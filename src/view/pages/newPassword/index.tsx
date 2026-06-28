import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { XCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageAnimation } from "@/view/layouts/animation/pageAnimation";
import { useNewPassword } from "./useNewPassword";

export function NewPassword() {

  const { handleSubmit, register, errors, isPending } = useNewPassword();

  return (    
    <PageAnimation>  
      <section>  
        <Card className="w-full min-w-sm">
          <CardHeader>
            <CardTitle>Troque sua senha!</CardTitle>
            <CardDescription>Insira sua nova senha abaixo para trocarmos suas credenciais.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              <FieldGroup>
                <Field aria-invalid={!!errors.password} >
                  <FieldLabel htmlFor="password">Nova Senha</FieldLabel>
                  <Input 
                    id="password" 
                    type="password" 
                    aria-invalid={!!errors.password}
                    {...register("password")} />
                    {errors.password?.message && (
                      <FieldError className="text-red-600 flex items-center gap-x-1">
                        <XCircleIcon size={10}/>
                        {errors.password?.message}
                      </FieldError>
                  )}
                </Field>
                <Field aria-invalid={!!errors.confirmPassword} >
                  <FieldLabel htmlFor="confirmPassword">Confirme sua senha</FieldLabel>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    aria-invalid={!!errors.confirmPassword}
                    {...register("confirmPassword")} />
                    {errors.confirmPassword?.message && (
                      <FieldError className="text-red-600 flex items-center gap-x-1">
                        <XCircleIcon size={10}/>
                        {errors.confirmPassword?.message}
                      </FieldError>
                  )}
                </Field>
              </FieldGroup>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner data-icon="inline-start"/>}
                Trocar senha
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </PageAnimation>
  )
}
