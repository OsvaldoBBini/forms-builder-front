import { AuthLayout } from '@/view/layouts/AuthLayout'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './authGuard'
import { Home } from '@/view/pages/home'
import { SignIn } from '@/view/pages/signIn'
import { SignUp } from '@/view/pages/signUp'
import { AnimatePresence } from "motion/react"
import { ConfirmationAccount } from '@/view/pages/confirmationAccount'
import { ForgotPassword } from '@/view/pages/forgotPassword'
import { NewPassword } from '@/view/pages/newPassword'
import { AppLayout } from '@/view/layouts/AppLayout'
import { Customers } from '@/view/pages/customers'
import { FormsManager } from '@/view/pages/formsManager'

export function Router() {

  return(
    <BrowserRouter>
      <AnimatePresence mode='wait'>
        <Routes>      
          <Route element={<AuthGuard isPrivate={false}/>}>
            <Route element={<AuthLayout/>}>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/account-confirmation" element={<ConfirmationAccount/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/new-password/:email/:code" element={<NewPassword/>}/>
            </Route>
          </Route>

          <Route element={<AppLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/forms-manager' element={<FormsManager/>}/>
          </Route>
        
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

