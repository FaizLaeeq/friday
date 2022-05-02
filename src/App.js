import logo from "./redux.png";
import "./App.css";
import { useState, useRef } from "react";
import Populate from "./components/Populate";

function App() {
  const [params, setParams] = useState("");
  const inputRef = useRef();

  const inputHandler = (e) => {
    e.preventDefault();
    const queryString = inputRef.current.value.replace(/\s+/g, "");
    setParams(queryString);
  };

  return (
    <div>
      <aside>
        <img src={logo} alt="logo" />
      </aside>
      <main>
        <article>
          <h4>Predicatable State</h4>
          <p>
            Lorem <span>ipsum</span> dolor sit amet, consectetur adipisicing
            elit. Nihil tenetur nam alias eum qui, ad magni, sequi possimus
            mollitia neque aliquid sunt blanditiis reprehenderit saepe. Omnis,
            sapiente accusantium. Provident pariatur <span>quia suscipit </span>
            natus, tenetur qui aliquam accusantium odit rem fugit aut, nam vel?
            Nulla inventore architecto molestiae beatae aliquid neque deleniti
            omnis tempore ad esse! Optio inventore quam non voluptas, illum
            tenetur neque nam quaerat numquam maiores, praesentium vero vitae
            obcaecati enim nostrum sapiente ex necessitatibus mollitia id
            debitis dolores pariatur modi? Quos et voluptatem magnam laudantium
            assumenda temporibus sunt at odit provident nobis, adipisci, eaque
            repudiandae dolor, maxime fugit.
          </p>
        </article>
        <form onSubmit={inputHandler}>
          <label>github username</label>
          <br />
          <input className="search" type="search" ref={inputRef} />
        </form>
        <Populate params={params} />
      </main>
    </div>
  );
}

export default App;
