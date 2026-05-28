import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useMutation } from '@tanstack/react-query';
import { authService } from "@/app/services/authServices";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SigninParams } from "@/app/services/authServices/signIn";
import { useAuth } from "@/app/hooks/useAuth";


const schema = z.object({
  email: z.email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos')
})

type FormData = z.infer<typeof schema>

export function Login() {

  const signIn = useAuth((state) => state.signIn) 

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: SigninParams) => { return authService.signIn(data) }
  });

  const handleSubmit = hookFormSubmit( async (data) => {
    await mutateAsync(data)
      .then(({accessToken, refreshToken}) => { signIn(accessToken, refreshToken) })
  });

  return (
    <section>
      <form className=" flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor="e-mail">E-mail</FieldLabel>
          <Input id="e-mail" type="E-mail" {...register("email")}/>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" {...register("password")}/>
          <a className="mt-1 underline decoration-1" href="http://google.com">Esqueci a senha</a>
        </Field>
        <Button type="submit" >
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
