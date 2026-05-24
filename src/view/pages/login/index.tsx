import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function Login() {
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
