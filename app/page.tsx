import Error from "./error";
import Home from "@/components/Home";

export const metadata = {
  title: "Home - HotelDK",
};

const fetchRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();

  try {
    const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }

  ///return res.json();
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
