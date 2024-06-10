import { Button } from "@/components/ui/button";
import { Note } from "@/types";
interface UpdateNoteProps {
  noteData: Note | null;
}
function UpdateNote({ noteData }: UpdateNoteProps) {
  console.log(noteData);
  return (
    <main className="h-screen px-3 overflow-hidden">
      <section>
        <form>
          <div
            className=" relative top-12    w-full z-[100] flex flex-col max-w-xl mx-auto my-4 overflow-hidden border rounded shadow-md cursor-pointer text-foreground bg-background shadow-foreground/30 border-foreground/40 
             min-h-[70dvh]"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="p-4 my-2 font-semibold uppercase outline-none text-foreground bg-background placeholder:capitalize"
            />
            <hr />
            <textarea
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
