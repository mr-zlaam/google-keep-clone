import { Button } from "@/components/ui/button";
import { useMessage } from "@/hooks/useMessage";
import { Note } from "@/types";
import { useEffect, useState } from "react";
function UpdateNote({
  noteData: fetchNoteData,
  updateSlug,
}: {
  noteData: any;
  updateSlug: string;
}) {
  const noteData: Note = fetchNoteData;
  const { errorMessage } = useMessage();
  const [updateData, setUpdateData] = useState({
    title: noteData.title || "",
    description: noteData?.description || "",
  });
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
  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    const newSlug = updateSlug.split("_")[0];
    console.log(newSlug);
    try {
      const { title, description } = updateData;
      if (!title || !description)
        return errorMessage("All fields are required!!");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <main className="h-screen px-3 overflow-hidden">
      <section>
        <form onSubmit={handleUpdate}>
          <div
            className=" relative top-12    w-full z-[100] flex flex-col max-w-xl mx-auto my-4 overflow-hidden border rounded shadow-md cursor-pointer text-foreground bg-background shadow-foreground/30 border-foreground/40 
             min-h-[70dvh]"
          >
            <input
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
              className="h-[70dvh]  px-4 py-4 outline-none resize-none my-7 bg-background"
            />
            <Button className="absolute py-4 bottom-2 right-4" type="submit">
              update
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default UpdateNote;
