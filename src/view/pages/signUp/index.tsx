import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  // FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginChange } from "@/components/loginChange";


export function SignUp() {

  const isPending = false;

  return (
    <section className="flex gap-x-4 min-w-xl">
      
      <LoginChange actionText="Entrar" label="Bem vindo de volta!!" />

      <div className="flex-1 flex flex-col gap-y-6 w-full">
        <h1 className="text-center text-xl font-bold">Cadastre-se</h1>
        <form className="flex flex-col gap-y-4" onSubmit={console.log}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Nome completo</FieldLabel>
              <Input 
                id="fullName" 
                type="fullName" />
              {/* {errors.email?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.email?.message}
                </FieldError>
              )} */}
            </Field>
            
            <Field>
              <FieldLabel htmlFor="e-mail">E-mail</FieldLabel>
              <Input 
                id="e-mail" 
                type="E-mail" />
              {/* {errors.email?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.email?.message}
                </FieldError>
              )} */}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input 
                id="password" 
                type="password" />
              {/* {errors.password?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1">
                  <XCircleIcon size={10}/>
                  {errors.password?.message}
                </FieldError>
              )} */}
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
