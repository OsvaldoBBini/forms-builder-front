import { AuthLayout } from '@/view/layouts/AuthLayout'
import { Login } from '@/view/pages/login'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './authGuard'


export function Router() {

  return(
    <BrowserRouter>
      <Routes>
        
        <Route element={<AuthGuard isPrivate={false}/>}>
          <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate/>}>
          <Route path='/' element={<h1>Dash</h1>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
