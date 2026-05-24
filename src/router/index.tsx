import { AuthLayout } from '@/view/layouts/AuthLayout'
import { Login } from '@/view/pages/login'
import {Routes, Route, BrowserRouter } from 'react-router-dom'


export function Router() {

  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path='login' element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}
