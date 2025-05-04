import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import slugify from "slugify";
import { notFound } from "next/navigation";

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
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${
      (
        await params
      ).slug
    }`,
    method: "GET",
    nextOption: {
      // cache: "no-store",
      next: { tag: ["track-by-id"] }
    }
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

export async function generateStaticParams() {
  return [
    { slug: "nu-hon-bisou-6507bf9cf423204f73c438cc.html" },
    { slug: "le-luu-ly-6507bf9cf423204f73c438cf.html" },
    { slug: "sau-con-mua-6507bf9cf423204f73c438d0.html" }
  ];
}

const DetailTrackPage = async (props: any) => {
  // console.log(slugify("Lệ Lưu Ly", { lower: true, locale: "vi" }));
  const { params } = props; // ( lấy slug or id)

  const temp = params?.slug?.split(".html");
  const temp1 = temp[0]?.split("-");
  const id = temp1[temp1.length - 1];

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: "GET"
    // nextOption: { cache: "no-store" }
  });

  const res1 = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 100,
      trackId: id,
      sort: "-createdAt"
    }
  });
  // console.log(res1, ">>> check res1: ");

  if (!res?.data) {
    notFound();
  }

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
