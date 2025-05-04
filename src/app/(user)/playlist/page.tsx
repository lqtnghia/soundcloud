import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Typography
} from "@mui/material";
import React, { Fragment } from "react";
import { authOptions } from "@/app/api/auth/auth.options";
import { Metadata } from "next";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import NewPlaylist from "@/app/(user)/playlist/components/new.playlist";
import AddPlaylistTrack from "@/app/(user)/playlist/components/add.playlist.track";
import { ExpandMore, PlayArrow } from "@mui/icons-material";
import CurrentTrack from "@/app/(user)/playlist/components/current.track";

export const metadata: Metadata = {
  title: "Playlist bạn đã tạo",
  description: "miêu tả thôi mà"
};

const PlaylistPage = async () => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IModelPaginate<IPlaylist>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/by-user`,
    method: "POST",
    queryParams: { current: 1, pageSize: 100 },
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
    nextOption: {
      next: { tags: ["playlist-by-user"] }
    }
  });

  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
    method: "GET",
    queryParams: { current: 1, pageSize: 100 },
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    }
  });

  const playLists = res?.data?.result ?? [];
  const tracks = res1?.data?.result ?? [];
  console.log("playlists", playLists);
  console.log("tracks", tracks);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h3>Danh sách phát</h3>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <NewPlaylist />
          <AddPlaylistTrack playlists={playLists} tracks={tracks} />
        </div>
      </div>
      <Divider />
      <Box>
        {playLists.map((playList) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">{playList.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {playList?.tracks?.map((track) => {
                  return (
                    <Fragment key={track._id}>
                      <CurrentTrack track={track} />

                      <Divider />
                    </Fragment>
                  );
                })}
                {playList?.tracks?.length === 0 && <span>No data.</span>}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
      <div></div>
    </Container>
  );
};

export default PlaylistPage;
