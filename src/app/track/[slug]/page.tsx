"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const DetailTrackPage = (props: any) => {
  const { params } = props; // ( lấy slug or id)
  // console.log(">>> check props: ", props);
  const searchParams = useSearchParams();

  const search = searchParams.get("audio");
  console.log(">>> check audio: ", search);
  return <div>DetailTrackPage</div>;
};

export default DetailTrackPage;
