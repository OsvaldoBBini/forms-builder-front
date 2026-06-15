import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSignIn } from "./useSignIn"
import { XCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { LoginChange } from "@/components/loginChange"
import { PageAnimation } from "@/view/layouts/animation/pageAnimation"

export function SignIn() {
  const { handleSubmit, register, errors, isPending } = useSignIn()

  return (
    <PageAnimation>
      <section 
        className="flex gap-x-4 min-w-xl">
        <div className="flex-1 flex flex-col gap-y-6 w-full">
          <h1 className="text-center text-xl font-bold">Acesse sua conta</h1>
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
        </div>

        <LoginChange router="signup" actionText="Cadastre-se" label="Novo por aqui?" />
      </section>
    </PageAnimation>
  )
}
