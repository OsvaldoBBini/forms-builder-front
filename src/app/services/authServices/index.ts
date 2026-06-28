import { signIn } from "./signIn";
import { signUp } from "./signUp";
import { refreshToken } from "./refreshToken";
import { accountConfirmation } from "./accountConfirmation";
import { resendConfirmationCode } from "./resendConfirmationCode";
import { forgotPassword } from "./forgotPassword";
import { resetPassword } from "./resetPassword";

export const authService = {
  signIn,
  signUp,
  refreshToken,
  accountConfirmation,
  resendConfirmationCode,
  forgotPassword,
  resetPassword
}
