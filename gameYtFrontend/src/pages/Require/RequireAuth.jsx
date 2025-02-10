import { Navigate, Outlet } from "react-router-dom";

// import useQuestionStore from "../../store/zustand";

function RequireAuth() {
  // const { auth } = useQuestionStore();

  // return !auth?.email ? <Navigate to={"/login"} replace={true} /> : <Outlet />;
  return <Outlet />;
}

export default RequireAuth;
