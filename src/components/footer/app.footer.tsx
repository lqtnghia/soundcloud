import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customHook";

export default function AppFooter() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>; //fragment

  // console.log(">>> check backend url: ", process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Container>
          <Toolbar sx={{ display: "flex", gap: 10 }}>
            <AudioPlayer
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
              volume={0.5}
              style={{ boxShadow: "unset", background: "#f2f2f2" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                minWidth: 100
              }}
            >
              <div style={{ color: "#ccc" }}>Trọng Nghĩa</div>
              <div style={{ color: "black" }}>Who am I ?</div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
