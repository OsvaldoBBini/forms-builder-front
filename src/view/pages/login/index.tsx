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
import { Link } from "react-router-dom"

export function Login() {

  const { handleSubmit, register, errors, isPending } = useLogin()

  return (
    <section className="flex flex-col gap-y-6">

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

      <Separator/>

      <h3>
        Não possui uma conta ainda? <Link className="underline decoration-1" to="/register">Cadastre-se</Link>
      </h3>

    </section>
  )
}
