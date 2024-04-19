import Home from "@/components/Home";

const fetchRooms = async () => {
  const res = await fetch("http://localhost:300/api/rooms");
  return res.json();
};

export default async function HomePage() {
  const rooms = await fetchRooms();
  return <Home />;
}
