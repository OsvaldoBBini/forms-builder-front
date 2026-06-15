import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  // FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginChange } from "@/components/loginChange";
import { XCircleIcon } from "lucide-react";
import { useSignUp } from "./useSignUp";


export function SignUp() {

  const { handleSubmit, register, errors, isPending } = useSignUp();

  return (
    <section className="flex gap-x-4 min-w-xl">
      
      <LoginChange router="signin" actionText="Entrar" label="Bem vindo de volta!!" />

      <div className="flex-1 flex flex-col gap-y-6 w-full">
        <h1 className="text-center text-xl font-bold">Cadastre-se</h1>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field aria-invalid={!!errors.fullName} >
              <FieldLabel htmlFor="fullName">Nome completo</FieldLabel>
              <Input 
                id="fullName" 
                type="fullName" 
                aria-invalid={!!errors.fullName}
                {...register("fullName")} />
                {errors.fullName?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.fullName?.message}
                </FieldError>
              )}
            </Field>
            
            <Field aria-invalid={!!errors.email} >
              <FieldLabel htmlFor="e-mail">E-mail</FieldLabel>
              <Input 
                id="e-mail" 
                type="E-mail" 
                aria-invalid={!!errors.email}
                {...register("email")} />
                {errors.email?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.email?.message}
                </FieldError>
              )}
            </Field>  

            <Field aria-invalid={!!errors.password} >
              <FieldLabel htmlFor="password">Senha</FieldLabel>
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
          </FieldGroup>
          
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start"/>}
            Criar conta
          </Button>
        </form>
      </div>
    </section>
  )
}
