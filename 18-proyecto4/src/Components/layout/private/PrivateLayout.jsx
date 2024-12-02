import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const PrivateLayout = () => {
  return (
    <>
      <Header />

      <section className="layout_content">
        <Outlet />
      </section>

      <Sidebar />
    </>
  );
};
