import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLogin } from "./useLogin"
import { XCircleIcon } from "lucide-react"

export function Login() {

  const { handleSubmit, register, errors, isPending } = useLogin()

  return (
    <section>
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
        
        <a className="text-right mt-1 underline decoration-1" href="http://google.com">Esqueci a senha</a>
        
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner data-icon="inline-start"/>}
          Entrar
        </Button>
      </form>

      <Separator className="mb-4 mt-4"/>

      <div>
        <h3>
          Não possui uma conta ainda? <a className="underline decoration-1" href="http://google.com">Cadastre-se</a>
        </h3>
      </div>

    </section>
  )
}
