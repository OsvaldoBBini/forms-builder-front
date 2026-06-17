import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { XCircleIcon } from "lucide-react";
import { useSignUp } from "./useSignUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";
import { PageAnimation } from "@/view/layouts/animation/pageAnimation";

export function SignUp() {

  const { handleSubmit, register, errors, isPending } = useSignUp();

  return (    
    <PageAnimation>  
      <section>  
        <Card className="w-full min-w-sm">
          <CardHeader>
            <CardTitle>Seja bem vindo!</CardTitle>
            <CardDescription>Insira suas informações para se cadastrar.</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <FieldSeparator />
          <CardFooter className="flex justify-center items-center">
            <span> Já possui uma conta? <Link to="/signin">Acesse aqui</Link></span>
          </CardFooter>
        </Card>
      </section>
    </PageAnimation>
  )
}
