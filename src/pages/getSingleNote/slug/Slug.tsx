import DivWrapper from "@/_components/DivWrapper/DivWrapper";
import Loader from "@/_components/loading/Loader";
import { Button } from "@/components/ui/button";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { errorMessage, successMessage } = useMessage();
  const fetchSingleNote = async () => {
    try {
      startLoading();
      const singleNote = (await GetSingleNote(
        slug?.toString() as string
      )) as Note;
      setNote(singleNote);

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
      setIsModalOpen(false);
      startLoading();
      await DeleteNote(note?.id ? note.id : ("" as string));
      successMessage("Note deleted successfully");
      return navigate("/");
    } catch (error: any) {
      if (error instanceof Error)
        errorMessage(
          error.message || "something went wrong while deleteing data"
        );
    } finally {
      stopLoading();
    }
  };
  return (
    <>
      {isModalOpen && (
        <div
          className="absolute px-5 w-[250px] py-4 transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 bg-background  rounded-md  md:w-[500px] overflow-hidden flex flex-col  justify-between h-fit
        shadow-2xl shadow-foreground/20
        "
        >
          <h1 className="w-full py-4 font-semibold sm:text-center sm:text-xl text-muted-foreground ">
            Are You Sure You want to delete this note?
          </h1>
          <div className="flex flex-col justify-end w-full gap-4 md:flex-row">
            <Button
              className="mx-4"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={deleteNote}
              className="mx-4 text-white transition-all duration-300"
            >
              Yes I am sure
            </Button>
          </div>
        </div>
      )}
      {!isModalOpen && !isLoading && (
        <main className="h-screen px-3 overflow-hidden">
          <DivWrapper
            className="fixed left-5 top-2 lg:top-5"
            onClick={() => navigate("/")}
          >
            <MdKeyboardArrowLeft size={30} />
          </DivWrapper>

          {note ? (
            <section className=" bg-background max-w-xl mx-auto max-h-[80dvh]  min-h-[90dvh] z-[10] relative top-12 border md:border-foreground/50 border-foreground/20 rounded-md  overflow-hidden break-words ">
              <div className="">
                <h2 className="w-full p-4 my-2 overflow-hidden font-semibold uppercase break-words bg-transparent text-foreground leading-[2]">
                  {note.title}
                </h2>
                <hr />
                <span className="block w-full my-3 text-xs text-center">
                  Last Update:-{" "}
                  {note.time && new Date(note.time.toDate()).toLocaleString()}
                </span>
                <pre className="h-[68dvh] w-full  px-4 py-5 text-balance outline-none resize-none my-7 bg-transparent font-sans overflow-x-hidden ">
                  {note.description}
                </pre>
              </div>
              <div className="absolute bottom-0 flex justify-end w-full py-2 bg-background">
                <DivWrapper
                  className="mx-4"
                  onClick={() => {
                    navigate(`/updateNote/${slug}`);
                  }}
                >
                  <FaEdit size={25} className="" />
                </DivWrapper>
                <DivWrapper
                  className="mx-4"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
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
      )}
    </>
  );
}

export default Slug;
