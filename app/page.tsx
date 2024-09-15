import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const items = await db.query.testing.findMany();
  return (
    <div>
      {items.map((item)=>{
        return (
          <div key={item.id}>
            {item.name}
          </div>
        )
      })}
    </div>
  );
}
