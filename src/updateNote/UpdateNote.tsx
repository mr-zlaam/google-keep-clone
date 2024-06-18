import Loader from "@/_components/loading/Loader";
import { auth, db } from "@/backend/db/firebase.config";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useSlugGenerator } from "@/hooks/useSlugGenerator";
import { Note } from "@/types";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface UpdateNoteProps {
  noteData: Note | null;
  updateSlug?: string;
}
function UpdateNote({ noteData, updateSlug }: UpdateNoteProps) {
  const { errorMessage, successMessage } = useMessage();
  const { startLoading, isLoading, stopLoading } = useLoading();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    title: noteData?.title || "",
    description: noteData?.description || "",
  });
  const currentUser = {
    id: auth?.currentUser?.uid,
    name: auth?.currentUser?.displayName,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setUpdateData({
      title: noteData?.title || "",
      description: noteData?.description || "",
    });
  }, [noteData?.title, noteData?.description]);
  const handleUpdate = async (): Promise<any> => {
    const randomStr = updateSlug?.split("_")[1];
    const slug = useSlugGenerator(updateData?.title as string);
    const updateNewData = {
      title: updateData.title.toUpperCase(),
      description: updateData.description,
      slug: slug + "_" + randomStr,
      time: Timestamp.now(),
      uploadedBy: currentUser,
    };
    const docRef = doc(db, "notes", noteData?.id as string);
    const { title, description } = updateData;
    if (!title || !description)
      return errorMessage("All fields are required!!");
    try {
      setIsModalOpen(false);
      startLoading();
      await updateDoc(docRef, updateNewData);
      successMessage("Note Update successfully");
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      stopLoading();
    }
  };
  const hanldeModalOpen = () => {
    const { title, description } = updateData;

    if (!title) return errorMessage("Title shouldn't be left empty!!");
    if (!description)
      return errorMessage("Description shouldn't be left empty!!");
    setIsModalOpen(true);
  };
  return (
    <>
      {isLoading && (
        <div className="before:fixed before:h-screen before: before:w-full before:bg-transparent before:top-0 before:left-0">
          <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-[999]" />
        </div>
      )}
      {isModalOpen && (
        <div className="mx-3 absolute px-5 py-4 transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 bg-background border-foreground rounded-md h-[150px] md:w-[500px] overflow-hidden flex flex-col  justify-between ">
          <h1 className="w-full py-4 text-xl font-semibold text-center">
            Are You Sure You want to update this note?
          </h1>
          <div className="flex justify-end w-full ">
            <Button
              className="mx-4"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className="mx-4 transition-all duration-300 bg-green-700 hover:bg-green-600"
            >
              Yes I am sure
            </Button>
          </div>
        </div>
      )}
      {!isModalOpen && !isLoading && (
        <main className="h-screen px-3 overflow-hidden">
          <section>
            <div
              className="relative w-full z-[100] flex flex-col top-14 max-w-xl mx-auto overflow-hidden border rounded shadow-md cursor-pointer text-foreground bg-background shadow-foreground/30 border-foreground/40 
          max-h-[84dvh]   md:min-h-[70dvh] "
            >
              <input
                autoFocus
                value={updateData.title}
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Title"
                className="p-4 my-2 font-semibold uppercase outline-none text-foreground bg-background placeholder:capitalize"
              />
              <hr />
              <textarea
                value={updateData.description}
                onChange={handleChange}
                name="description"
                id="note"
                placeholder="Take a note..."
                className="h-[450px]   px-4 py-4 outline-none resize-none my-7 bg-background"
              />
              <Button
                className="absolute py-4 bottom-2 right-4"
                onClick={hanldeModalOpen}
              >
                update
              </Button>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default UpdateNote;
