import { Button } from "@/components/ui/button";

function UpdateNote() {
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
      {/* <div className="before:fixed before:h-screen before: before:w-full before:bg-transparent before:top-0 before:left-0">
        <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      </div> */}
    </main>
  );
}

export default UpdateNote;
