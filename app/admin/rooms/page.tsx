import { getAuthHeader } from "@/helpers/authHeader";
import Error from "@/app/error";
import AllRooms from "@/components/admin/AllRooms";

export const metadata = {
  title: "All Rooms - ADMIN",
};

const fetchRooms = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
    headers: authHeaders.headers,
  });
  return res.json();
};

export default async function AdminRoomsPage() {
  const data = await fetchRooms();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllRooms data={data} />;
}
