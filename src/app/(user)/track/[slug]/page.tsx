import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  // fetch data
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${(await params).slug}`,
    method: "GET",
    nextOption: { cache: "no-store" }
  });

  return {
    title: res.data?.title,
    description: res.data?.description,
    openGraph: {
      title: "Nghia Track Page",
      description: "Beyond Your Coding Skills",
      type: "website",
      images: [
        `https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`
      ]
    }
  };
}

const DetailTrackPage = async (props: any) => {
  const { params } = props; // ( lấy slug or id)

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
    nextOption: { cache: "no-store" }
  });

  const res1 = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 100,
      trackId: params.slug,
      sort: "-createdAt"
    }
  });
  console.log(res1, ">>> check res1: ");
  // console.log(res1?.data?.result, ">>> check res1 result: ");
  return (
    <Container>
      <WaveTrack
        track={res?.data ?? null}
        //@ts-ignore
        comments={res1?.data?.result ?? []}
      />
    </Container>
  );
};

export default DetailTrackPage;
