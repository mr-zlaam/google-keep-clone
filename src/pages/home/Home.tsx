import CreateNote from "@/_components/createNote/CreateNote";
import Loader from "@/_components/loading/Loader";
import { Card } from "@/components/ui/card";
import useLoading from "@/hooks/useLoading";
import { Note } from "@/types";
import { GetData } from "@/utils/GetData";
import { Fragment, useEffect, useState } from "react";

function Home() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<null | Note[]>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  useEffect(() => {
    const getData = async () => {
      startLoading();
      const response = await GetData();
      console.log(response);
      setData(response);
      stopLoading();
      setIsUploaded(false);
      return response;
    };
    getData();
  }, [isUploaded]);
  console.log(data);
  return (
    <>
      <CreateNote setIsUploaded={setIsUploaded} />
      {isLoading && (
        <div className="before:fixed before:h-screen before: before:w-full before:bg-transparent before:top-0 before:left-0">
          <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>
      )}
      <section className="grid justify-center grid-cols-1 px-5 my-4 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((note) => (
            <Fragment key={note.id}>
              <Card className="h-[400px] bg-background shadow-lg cursor-pointer p-3 m-3">
                <h2 className="text-lg">{note.title}</h2>
                <p className="text-sm">{note.description}</p>
              </Card>
            </Fragment>
          ))}
      </section>
    </>
  );
}

export default Home;
