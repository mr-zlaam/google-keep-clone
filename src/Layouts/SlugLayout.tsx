import {} from "react";
import { Outlet } from "react-router-dom";

function SlugLayout() {
  return (
    <>
      <section>
        <Outlet />
      </section>
    </>
  );
}

export default SlugLayout;
