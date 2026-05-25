import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useMutation } from '@tanstack/react-query';
import type { SigninParams } from "@/app/services/authServices/signIn";
import { authService } from "@/app/services/authServices";

export function Login() {

  const mutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: SigninParams) => { return authService.signIn(data) }
  })


  return (
    <section>
      <form className=" flex flex-col gap-y-2">
        <Field>
          <FieldLabel htmlFor="e-mail">E-mail</FieldLabel>
          <Input id="e-mail" type="E-mail"/>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password"/>
          <a className="mt-1 underline decoration-1" href="http://google.com">Esqueci a senha</a>
        </Field>
        <Button type="submit">
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
