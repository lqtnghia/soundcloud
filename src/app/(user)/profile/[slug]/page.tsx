import ProfileTracks from "@/components/header/profile.tracks";
import { sendRequest } from "@/utils/api";
import { Container, Grid } from "@mui/material";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
    method: "POST",
    body: { id: params.slug }
  });
  // console.log(">>> check tracks: ", tracks);
  const data = tracks?.data?.result ?? [];

  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={5}>
        {data.map((item: ITrackTop, index: number) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <ProfileTracks data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
