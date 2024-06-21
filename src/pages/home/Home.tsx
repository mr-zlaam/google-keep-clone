import CreateNote from "@/_components/createNote/CreateNote";
import Loader from "@/_components/loading/Loader";
import { Card } from "@/components/ui/card";
import { useSearchContext } from "@/context/SearchContext";
import useLoading from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { Note } from "@/types";
import { GetData } from "@/utils/GetData";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { errorMessage } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<null | Note[]>(null);
  const [filteredData, setFilteredData] = useState<null | Note[]>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const navigate = useNavigate();
  const { searchItem } = useSearchContext();

  useEffect(() => {
    const getData = async () => {
      try {
        startLoading();
        const response = await GetData();
        setData(response);
        setFilteredData(response);
        setIsUploaded(false);
        return response;
      } catch (error) {
        errorMessage("something wrong while getting note!!");
        return navigate("/");
      } finally {
        stopLoading();
      }
    };
    getData();
  }, [isUploaded]);

  const GotToSlugPage = (pathname: string) => {
    return navigate(`/1/${pathname}`);
  };

  useEffect(() => {
    const filterNotes = () => {
      if (data && searchItem) {
        const filtered = data.filter(
          (note) =>
            note.title.toLowerCase().includes(searchItem.toLowerCase()) ||
            note.description.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    };
    filterNotes();
  }, [searchItem, data]);

  return (
    <>
      {isLoading && (
        <div className="before:fixed before:h-screen before:w-full before:bg-transparent before:top-0 before:left-0 z-[999]">
          <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>
      )}
      <CreateNote
        setIsUploaded={setIsUploaded}
        isNoteOpen={isNoteOpen}
        setIsNoteOpen={setIsNoteOpen}
      />
      {!isNoteOpen && (
        <Fragment>
          {filteredData?.length === 0 && (
            <main className="h-[70dvh] flex justify-center items-center">
              <h1 className="text-3xl font-bold text-red-500">
                {" "}
                No Notes Found!~
              </h1>
            </main>
          )}

          <section className="grid justify-center grid-cols-1 px-5 my-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredData &&
              filteredData.map((note) => (
                <Fragment key={note.id}>
                  <Card
                    onClick={() => {
                      GotToSlugPage(note.slug);
                    }}
                    className="min-h-[350px] bg-background shadow-lg cursor-pointer p-3 m-3 line-clamp-6 py-4 px-3 duration-200 transition-all hover:bg-foreground/5"
                  >
                    <h2 className="block my-3 text-lg font-semibold line-clamp-2 text-clip">
                      {note.title}
                    </h2>
                    <textarea
                      readOnly
                      defaultValue={note.description}
                      className="w-full h-full px-3 py-3 my-2 bg-transparent outline-none resize-none "
                    ></textarea>
                  </Card>
                </Fragment>
              ))}
          </section>
        </Fragment>
      )}
    </>
  );
}

export default Home;
