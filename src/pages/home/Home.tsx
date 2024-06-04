import { Card } from "@/components/ui/card";
import {} from "react";

function Home() {
  return (
    <>
      <section className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="h-[400px] bg-background shadow-lg cursor-pointer p-3 duration-300 transition-all hover:scale-105 m-3"></Card>
        <Card className="h-[400px] bg-background shadow-lg cursor-pointer p-3 duration-300 transition-all hover:scale-105 m-3"></Card>
        <Card className="h-[400px] bg-background shadow-lg cursor-pointer p-3 duration-300 transition-all hover:scale-105 m-3"></Card>
      </section>
    </>
  );
}

export default Home;
