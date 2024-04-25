import Error from "@/app/error";
import UploadRoomImages from "@/components/admin/UploadRoomImages";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Upload Room Images - ADMIN",
};

const fetchRooms = async () => {

  const res = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
    next: {
      tags: ["RoomDetails"],
    },
  });
  return res.json();
};

export default async function AdminUploadImagesPage() {
  const data = await fetchRooms();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UploadRoomImages data={data} />;
}
