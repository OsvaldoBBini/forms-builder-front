import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface IConfirmationCard {
  title: string;
  description: string;
  label: string;
  buttonLabel: string;
}

export function ConfirmationCard({ title, description, label, buttonLabel }: IConfirmationCard) {
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              {label}
            </FieldLabel>
          </div>

          <InputOTP maxLength={6} id="otp-verification" required>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl flex justify-center items-center w-full">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>

      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" className="w-full">
            {buttonLabel}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
