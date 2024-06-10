import { useState } from "react";
import { useParams } from "react-router-dom";
import UpdateNote from "./UpdateNote";
import DivWrapper from "@/_components/DivWrapper/DivWrapper";
import { MdKeyboardArrowLeft } from "react-icons/md";

function UpdateSlug() {
  const { updateSlug } = useParams();
  const [noteData, setNoteData] = useState(null);
  return (
    <>
      <DivWrapper className="fixed left-5 top-2 lg:top-5">
        <MdKeyboardArrowLeft size={30} />
      </DivWrapper>
      <section>
        <UpdateNote />
      </section>
    </>
  );
}

export default UpdateSlug;
