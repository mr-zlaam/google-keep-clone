import DivWrapper from "@/_components/DivWrapper/DivWrapper";
import Loader from "@/_components/loading/Loader";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { Note } from "@/types";
import { GetSingleNote } from "@/utils/GetSingleNote";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
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
  return (
    <>
      <DivWrapper className="fixed left-5 top-5" onClick={() => navigate("/")}>
        <MdKeyboardArrowLeft size={30} />
      </DivWrapper>

      {note ? (
        <section className=" bg-background max-w-2xl mx-auto  min-h-[80dvh] z-[10] relative top-20 border border-foreground/50 rounded-md overflow-hidden">
          <div className="min-h-[70dvh] overflow-auto px-3 py-5 ">
            <h1 className="my-4 text-2xl font-semibold leading-[3] tracking-wide text-balance">
              {note && note.title}
            </h1>
            <p className="my-4 text-lg text-balance">
              {note && note.description}
            </p>
          </div>
          <div className="absolute bottom-0 flex justify-end w-full p-5 ">
            <Button className="mx-5">edit</Button>
            <Button className="mx-5">delete</Button>
          </div>
        </section>
      ) : (
        isLoading && (
          <div className="before:fixed before:h-screen before: before:w-full before:bg-transparent before:top-0 before:left-0">
            <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
        )
      )}
    </>
  );
}

export default Slug;
