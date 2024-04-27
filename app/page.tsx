import Error from "./error";
import Home from "@/components/Home";

export const metadata = {
  title: "Home - HostelDK",
};

const fetchRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();

  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
      cache: "no-cache"})

  return res.json();
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await fetchRooms(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
