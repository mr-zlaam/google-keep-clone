import DivWrapper from "@/_components/DivWrapper/DivWrapper";
import Loader from "@/_components/loading/Loader";
import useLoading from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { Note } from "@/types";
import DeleteNote from "@/utils/DeleteData";
import { GetSingleNote } from "@/utils/GetSingleNote";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

function Slug() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [note, setNote] = useState<null | Note>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { errorMessage } = useMessage();
  const fetchSingleNote = async () => {
    try {
      startLoading();
      const singleNote = (await GetSingleNote(
        slug?.toString() as string
      )) as Note;
      setNote(singleNote);
      // stopLoading();
      return singleNote;
    } catch (error) {
      if (error instanceof Error) {
        return errorMessage(error.message);
      }
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    fetchSingleNote();
  }, [slug]);
  const deleteNote = async () => {
    try {
      await DeleteNote(note?.id ? note.id : ("" as string));
      return navigate("/");
    } catch (error: any) {
      if (error instanceof Error)
        errorMessage(
          error.message || "something went wrong while deleteing data"
        );
    }
  };
  return (
    <main className="h-screen px-3 overflow-hidden">
      <DivWrapper
        className="fixed left-5 top-2 lg:top-5"
        onClick={() => navigate("/")}
      >
        <MdKeyboardArrowLeft size={30} />
      </DivWrapper>

      {note ? (
        <section className=" bg-background max-w-2xl mx-auto max-h-[80dvh]  min-h-[90dvh] z-[10] relative top-12 border md:border-foreground/50 border-foreground/20 rounded-md overflow-hidden">
          <div className="max-h-[80dvh] min-h-[70dvh] overflow-auto px-3 py-2 ">
            <h1 className="my-4 text-2xl font-semibold leading-[1.4] tracking-wide text-balance">
              {note && note.title}
            </h1>
            <p className="my-4 text-lg text-balance leading-[2]">
              {note && note.description}
            </p>
          </div>
          <div className="absolute bottom-0 flex justify-end w-full p-5 bg-background ">
            <DivWrapper
              className="mx-4"
              onClick={() => {
                navigate(`/updateNote/${slug}`);
              }}
            >
              <FaEdit size={25} className="" />
            </DivWrapper>
            <DivWrapper className="mx-4" onClick={deleteNote}>
              <MdDelete size={25} className="" />
            </DivWrapper>
          </div>
        </section>
      ) : (
        isLoading && (
          <div className="before:fixed before:h-screen before: before:w-full before:bg-transparent before:top-0 before:left-0">
            <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
        )
      )}
    </main>
  );
}

export default Slug;
