import { Fragment, useState } from "react";
import DivWrapper from "../DivWrapper/DivWrapper";
import { X } from "lucide-react";

function CreateNote() {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  return (
    <Fragment>
      {isNoteOpen && (
        <div
          onClick={() => setIsNoteOpen(false)}
          className="before:fixed z-[99] before:h-screen before: before:w-full before:bg-foreground/5 before:top-0 before:left-0"
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
              className="w-full px-4 py-4 outline-none cursor-pointer bg-background placeholder:text-foreground/80"
            />
          </div>
        </div>
      )}
      {isNoteOpen && (
        <div className="relative max-w-md px-3 mx-auto md:max-w-xl ">
          <DivWrapper
            className="block md:hidden  absolute top-5 right-[-20px] z-[101]"
            onClick={() => {
              setIsNoteOpen(false);
            }}
          >
            <X />
          </DivWrapper>
          <div className="h-fit absolute  w-full z-[100] flex flex-col max-w-xl mx-auto my-4 overflow-hidden border rounded shadow-md cursor-pointer text-foreground bg-background shadow-foreground/30 border-foreground/40">
            <input
              type="text"
              placeholder="Title"
              className="p-4 my-2 font-semibold outline-none text-foreground bg-background"
            />
            <textarea
              name="note"
              id="note"
              placeholder="Take a note..."
              className="h-full px-4 py-4 outline-none resize-none bg-background min-h-[70dvh]"
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default CreateNote;
