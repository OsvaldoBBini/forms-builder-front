import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSignIn } from "./useSignIn"
import { XCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { PageAnimation } from "@/view/layouts/animation/pageAnimation"

export function SignIn() {
  const { handleSubmit, register, errors, isPending } = useSignIn()

  return (
    <PageAnimation>
      <section>
        <Card className="min-w-sm">
          <CardHeader>
            <CardTitle>Seja bem vindo de volta!</CardTitle>
            <CardDescription>Insira suas informações para continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              <FieldGroup>
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="e-mail">E-mail</FieldLabel>
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

                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input 
                    id="password" 
                    type="password" 
                    aria-invalid={!!errors.password} 
                    {...register("password")}/>
                  {errors.password?.message && (
                    <FieldError className="text-red-600 flex items-center gap-x-1">
                      <XCircleIcon size={10}/>
                      {errors.password?.message}
                    </FieldError>
                  )}
                </Field>
              </FieldGroup>
              
              <Link className="text-right mt-1 underline decoration-1" to="/forgot-password">Esqueci a senha</Link>
              
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner data-icon="inline-start"/>}
                Entrar
              </Button>
            </form>
          </CardContent>
          <FieldSeparator />
          <CardFooter className="flex justify-center items-center">
            <span> Novo por aqui?  <Link to="/signup">Cadastre-se</Link></span>
          </CardFooter>
        </Card>
      </section>
    </PageAnimation>
  )
}
