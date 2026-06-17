import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex justify-center items-center w-lvw h-lvh">
      <Outlet/>
    </div>
  );
}
