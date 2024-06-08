import {} from "react";
import { useParams } from "react-router-dom";

function Slug() {
  const { slug } = useParams();
  return (
    <>
      <section>Slug:{slug}</section>
    </>
  );
}

export default Slug;
