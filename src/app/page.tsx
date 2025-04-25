import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth/next";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(">>> check session: ", session);
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "CHILL", limit: 10 }
  });
  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "WORKOUT", limit: 10 }
  });
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "PARTY", limit: 10 }
  });
  return (
    <div>
      <Container>
        <MainSlider data={chills?.data ? chills.data : []} />
        {/* <MainSlider data={chills?.data ??[]} /> */}
        <MainSlider data={workouts?.data ? workouts.data : []} />
        <MainSlider data={party?.data ? party.data : []} />
      </Container>
    </div>
  );
}
