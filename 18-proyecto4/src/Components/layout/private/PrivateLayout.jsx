import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import useAuth from "../../../Hooks/useAuth";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <Header />

        <section className="layout_content">
          {auth._id ? <Outlet /> : <Navigate to="/login" />}
        </section>

        <Sidebar />
      </>
    );
  }
};
