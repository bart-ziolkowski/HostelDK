import Error from "./error"
import Home from "@/components/Home";

export const metadata = {
  title: 'Home - HotelDK'
}

const fetchRooms = async () => {
  const res = await fetch(`${process.env.API_URL}/api/rooms`);
  return res.json();
};

export default async function HomePage() {
  const data = await fetchRooms();

  if (data?.message) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
