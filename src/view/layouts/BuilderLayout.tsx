import { Outlet } from 'react-router-dom';

export function BuilderLayout() {
  return (
    <div className="flex justify-center items-center w-lvw h-lvh">
      <Outlet/>
    </div>
  );
}
