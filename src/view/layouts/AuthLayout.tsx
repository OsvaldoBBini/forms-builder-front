import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex flex-col justify-center items-center w-lvw h-lvh">
      {/* <div className="flex justify-center items-center w-full"> */}
        <Outlet/>
      {/* </div> */}
    </div>
  );
}
