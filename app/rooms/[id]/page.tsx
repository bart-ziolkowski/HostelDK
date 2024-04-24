import Error from "@/app/error";
import { RoomDetails } from "@/components/room/RoomDetails";

interface Props {
  params: {
    id: string;
  };
}

const fetchRooms = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    next: {
      tags: ["RoomDetails"]
    }
  });
  return res.json();
};

export default async function RoomDetailsPage({ params }: Props) {
  const data = await fetchRooms(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <RoomDetails data={data} />;
}

export async function generateMetadata({ params }: Props) {
  const data = await fetchRooms(params?.id);
  return {
    title: data?.room?.name,
  };
}
