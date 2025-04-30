"use client";
import React, { useContext, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customHook";
import { TrackContext, useTrackContext } from "@/lib/tracks.wrapper";

export default function AppFooter() {
  const hasMounted = useHasMounted();
  const playRef = useRef(null);
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  console.log(">>> check currentTrack: ", currentTrack);

  useEffect(() => {
    if (!playRef.current || !currentTrack?.trackUrl) {
      console.warn("Không có trackUrl hoặc playRef không sẵn sàng");
      return;
    }
    //@ts-ignore
    const audio = playRef.current.audio.current;
    if (currentTrack.isPlaying && currentTrack.trackUrl) {
      audio.play().catch((error: any) => {
        console.error("Lỗi khi phát audio:", error);
      });
    } else {
      audio.pause();
    }
  }, [currentTrack]);

  if (!hasMounted) {
    return <></>;
  } //fragment
  return (
    <>
      {currentTrack._id && (
        <div style={{ marginTop: 50 }}>
          <AppBar
            position="fixed"
            sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
          >
            <Container
              disableGutters
              sx={{
                ".rhap_main": {
                  gap: "30px"
                }
              }}
            >
              <Toolbar sx={{ display: "flex", gap: 10 }}>
                <AudioPlayer
                  ref={playRef}
                  layout="horizontal-reverse"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                  volume={0.5}
                  style={{ boxShadow: "unset", background: "#f2f2f2" }}
                  onPlay={() => {
                    setCurrentTrack({ ...currentTrack, isPlaying: true });
                  }}
                  onPause={() => {
                    setCurrentTrack({ ...currentTrack, isPlaying: false });
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    width: "220px"
                  }}
                >
                  <div
                    style={{
                      color: "#ccc",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {currentTrack.description}
                  </div>
                  <div style={{ color: "black" }}>{currentTrack.title}</div>
                </div>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      )}
    </>
  );
}
