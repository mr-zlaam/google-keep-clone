import { Button } from "@/components/ui/button";
import { useMessage } from "@/hooks/useMessage";
import { GetData, collectionRef } from "@/utils/GetData";
import { Timestamp, addDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import DivWrapper from "../DivWrapper/DivWrapper";
import useLoading from "@/hooks/useLoading";
import Loader from "../loading/Loader";
import { auth } from "@/backend/db/firebase.config";
import { useSlugGenerator } from "@/hooks/useSlugGenerator";
import { useRandomStringGenerator } from "@/hooks/useRandomStringGenerator";
interface CreateNoteProp {
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}
function CreateNote({ setIsUploaded }: CreateNoteProp) {
  const { errorMessage, successMessage } = useMessage();
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const currentUser = {
    id: auth?.currentUser?.uid,
    name: auth?.currentUser?.displayName,
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle upload data
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    if (!data.title || !data.description)
      return errorMessage("All fields are required!!");
    const slug = useSlugGenerator(data.title);
    const randomStr = useRandomStringGenerator(10);
    const newData = {
      title: data.title.toUpperCase(),
      description: data.description,
      slug: slug + "_" + randomStr,
      time: Timestamp.now(),
      uploadedBy: currentUser,
    };

    try {
      startLoading();
      setIsNoteOpen(false);
      const response = await addDoc(collectionRef, newData);
      await GetData("title");
      setIsUploaded(true);
      stopLoading();
      successMessage("Note uploaded successfully");
      setData({ title: "", description: "" });
      return response;
    } catch (error: any) {
      if (error instanceof Error)
        return errorMessage(
          error.message || "something went wrong while creating note."
        );
    }
  };
  useEffect(() => {
    if (isNoteOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNoteOpen]);
  return (
    <Fragment>
      {isLoading && (
        <div className="before:fixed before:h-screen before: before:w-full before:bg-foreground/5 before:top-0 before:left-0">
          <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>
      )}
      <section>
        {isNoteOpen && (
          <div
            onClick={() => setIsNoteOpen(false)}
            className="before:fixed z-[99] before:h-screen before:w-full before:bg-foreground/5 before:top-0 before:left-0"
          />
        )}
        {!isNoteOpen && (
          <div className="px-5">
            <div className="max-w-xl mx-auto my-4 overflow-hidden border rounded shadow-md cursor-pointer shadow-foreground/30 border-foreground/40 ">
              <input
                onClick={() => setIsNoteOpen((prev) => !prev)}
                type="text"
                readOnly
                placeholder="Take a note..."
                className="w-full px-4 py-4 outline-none bg-background placeholder:text-foreground/80"
              />
            </div>
          </div>
        )}
        {isNoteOpen && (
          <div className="relative max-w-md px-3 mx-auto md:max-w-xl">
            <DivWrapper
              className="block md:hidden  absolute top-5 right-[-20px] z-[101]"
              onClick={() => {
                setIsNoteOpen(false);
              }}
            >
              <X />
            </DivWrapper>
            <form onSubmit={handleSubmit}>
              <div
                className=" absolute   w-full z-[100] flex flex-col max-w-xl mx-auto my-4 overflow-hidden border rounded shadow-md cursor-pointer text-foreground bg-background shadow-foreground/30 border-foreground/40 
             min-h-[70dvh]"
              >
                <input
                  onChange={handleChange}
                  value={data.title}
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="p-4 my-2 font-semibold uppercase outline-none text-foreground bg-background placeholder:capitalize"
                />
                <hr />
                <textarea
                  onChange={handleChange}
                  name="description"
                  id="note"
                  placeholder="Take a note..."
                  className="h-[70dvh]  px-4 py-4 outline-none resize-none my-7 bg-background"
                  value={data.description}
                />
                <Button
                  className="absolute py-4 bottom-2 right-4"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
      </section>
    </Fragment>
  );
}

export default CreateNote;
