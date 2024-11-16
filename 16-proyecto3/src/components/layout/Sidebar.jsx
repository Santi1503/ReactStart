import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const makeSearch = (e) => {
    e.preventDefault();
    let receiveSearch = e.target.search_field.value;
    navigate("/buscar/" + receiveSearch, { replace: true });
  };

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={makeSearch}>
          <input type="text" name="search_field" placeholder=" " />
          <input type="submit" id="search" value="Buscar" />
        </form>
      </div>
    </aside>
  );
};
