import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <>
      <Header />

      <section className="layout_content">
        <Outlet />
      </section>
    </>
  );
};
