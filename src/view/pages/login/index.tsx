import { useCallback, useState } from "react"
import { SignIn } from "../signIn"
import { SignUp } from "../signUp"

export type ISelection = "signIn" | "signUp"

export function Login() {

  const [selected, isSelected] = useState<ISelection>("signIn");

  const changeSelection = useCallback(
    () => isSelected((prevState) => prevState === "signIn" ? "signUp" : "signIn"), [isSelected]);

  return (
    <section>
      <div className={`${selected !== "signIn" && "hidden"}`}>
        <SignIn onSelect={changeSelection} />
      </div>
      <div className={`${selected !== "signUp" && "hidden"}`}>
        <SignUp onSelect={changeSelection}/>
      </div>
    </section>
  )
}
