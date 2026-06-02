import { AuthLayout } from '@/view/layouts/AuthLayout'
import { Login } from '@/view/pages/login'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './authGuard'
import { useAuth } from '@/app/hooks/useAuth'


export function Router() {

  const signOut = useAuth((state) => state.signOut) 

  return(
    <BrowserRouter>
      <Routes>
        
        <Route element={<AuthGuard isPrivate={false}/>}>
          <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate/>}>
          <Route path='/' element={
            <div>
              <h1>Dash</h1>
              <button onClick={signOut}>Sair</button>
            </div>
          }/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
