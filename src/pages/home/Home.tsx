import CreateNote from "@/_components/createNote/CreateNote";
import { Card } from "@/components/ui/card";
import { Note } from "@/types";
import { GetData } from "@/utils/GetData";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState<null | Note[]>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await GetData();
      setData(response);
    };
    getData();
  }, []);
  console.log(data);
  return (
    <>
      <CreateNote />
      <section className="grid justify-center grid-cols-1 px-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="h-[400px] bg-background shadow-lg cursor-pointer p-3 m-3"></Card>
        <Card className="h-[400px] bg-background shadow-lg cursor-pointer p-3 m-3"></Card>
        <Card className="h-[400px] bg-background shadow-lg cursor-pointer p-3 m-3"></Card>
      </section>
    </>
  );
}

export default Home;
