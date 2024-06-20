import DivWrapper from "@/_components/DivWrapper/DivWrapper";
import Loader from "@/_components/loading/Loader";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { Note } from "@/types";
import DeleteNote from "@/utils/DeleteData";
import { GetSingleNote } from "@/utils/GetSingleNote";
import { Fragment, useEffect, useState } from "react";
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
        <main className="flex items-center justify-center h-screen px-3 overflow-hidden bg-background">
          <DivWrapper
            className="fixed left-[-20px] lg:left-5 top-0 lg:top-5"
            onClick={() => navigate("/")}
          >
            <MdKeyboardArrowLeft size={30} />
          </DivWrapper>

          {note ? (
            <Fragment>
              <div className="flex flex-col  h-[90dvh]   p-3 resize-x mx-4  sm:w-[640px] w-[90%] px-4 rounded-md border">
                <h1 className="overflow-hidden text-base font-semibold uppercase break-words bg-transparent bg-red-500 py-7 sm:py-3 text-foreground h-fit sm:text-lg ">
                  {note.title}
                </h1>
                <hr />
                <p className="my-2 text-xs text-center ">
                  Last Update:-{" "}
                  {note.time && new Date(note.time.toDate()).toLocaleString()}
                </p>
                <textarea
                  readOnly
                  defaultValue={note.description}
                  className="h-full p-3 my-2 bg-transparent outline-none resize-none"
                ></textarea>
                <div className="flex justify-end w-full bg-background">
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
              </div>
            </Fragment>
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
