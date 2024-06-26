import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateNote from "./UpdateNote";
import DivWrapper from "@/_components/DivWrapper/DivWrapper";
import { MdKeyboardArrowLeft } from "react-icons/md";
import useLoading from "@/hooks/useLoading";
import { GetSingleNote } from "@/utils/GetSingleNote";
import { Note } from "@/types";
import Loader from "@/_components/loading/Loader";
import { useMessage } from "@/hooks/useMessage";

function UpdateSlug() {
  const { updateSlug } = useParams();
  const { errorMessage } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [noteData, setNoteData] = useState<Note | null>(null);
  const navigate = useNavigate();
  const fetchSingleNote = async () => {
    try {
      startLoading();
      const singleNote: Note = (await GetSingleNote(
        updateSlug?.toString() as string
      )) as Note;
      setNoteData(singleNote);
      return singleNote;
    } catch (error: any) {
      if (error instanceof Error)
        return errorMessage(
          error.message || "something went wrong while updating note"
        );
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    fetchSingleNote();
  }, [updateSlug]);
  return (
    <>
      {isLoading && (
        <div className="before:fixed before:h-screen before: before:w-full before:bg-transparent before:top-0 before:left-0 z-[999]">
          <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>
      )}
      <DivWrapper
        className="fixed hidden md:flex left-5 top-2 lg:top-5 z-[999] "
        onClick={() => navigate(`/1/${updateSlug}`)}
      >
        <MdKeyboardArrowLeft size={30} />
      </DivWrapper>

      <section>
        <UpdateNote noteData={noteData} updateSlug={updateSlug as string} />
      </section>
    </>
  );
}

export default UpdateSlug;
