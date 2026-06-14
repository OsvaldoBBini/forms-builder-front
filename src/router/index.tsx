import { AuthLayout } from '@/view/layouts/AuthLayout'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './authGuard'
import { Home } from '@/view/pages/home'
import { SignIn } from '@/view/pages/signIn'
import { SignUp } from '@/view/pages/signUp'

export function Router() {

  return(
    <BrowserRouter>
      <Routes>
        
        <Route element={<AuthGuard isPrivate={false}/>}>
          <Route element={<AuthLayout/>}>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
