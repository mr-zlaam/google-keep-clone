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
        <div className="absolute px-5 py-4 transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 bg-background border-foreground rounded-md h-[150px] md:w-[500px] overflow-hidden flex flex-col  justify-between ">
          <h1 className="w-full py-4 text-xl font-semibold text-center">
            Are You Sure You want to delete this note?
          </h1>
          <div className="flex justify-end w-full ">
            <Button
              variant={"default"}
              className="mx-4"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              cancel
            </Button>
            <Button
              onClick={deleteNote}
              variant={"destructive"}
              className="mx-4"
            >
              Yes I am sure
            </Button>
          </div>
        </div>
      )}
      {!isModalOpen && (
        <main className="h-screen px-3 overflow-hidden">
          <DivWrapper
            className="fixed left-5 top-2 lg:top-5"
            onClick={() => navigate("/")}
          >
            <MdKeyboardArrowLeft size={30} />
          </DivWrapper>

          {note ? (
            <section className=" bg-background max-w-xl mx-auto max-h-[80dvh]  min-h-[90dvh] z-[10] relative top-12 border md:border-foreground/50 border-foreground/20 rounded-md  overflow-hidden break-words">
              <div className="">
                <input
                  readOnly
                  value={note.title}
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="p-4 my-2 font-semibold uppercase bg-transparent outline-none text-foreground placeholder:capitalize"
                />
                <hr />
                <textarea
                  readOnly
                  value={note.description}
                  name="description"
                  id="note"
                  placeholder="Take a note..."
                  className="h-[70dvh] w-full  px-4 py-4 outline-none resize-none my-7 bg-transparent"
                />
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
