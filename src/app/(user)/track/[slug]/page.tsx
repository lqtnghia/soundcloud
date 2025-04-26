"use client";

import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";

const DetailTrackPage = (props: any) => {
  const { params } = props; // ( lấy slug or id)
  // console.log(">>> check props: ", props);
  const searchParams = useSearchParams();

  const search = searchParams.get("audio");
  console.log(">>> check audio: ", search);
  return (
    <Container>
      <WaveTrack />
    </Container>
  );
};

export default DetailTrackPage;
