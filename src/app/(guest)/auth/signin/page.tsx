import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthSignin from "@/components/auth/auth.signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <AuthSignin />;
};

export default SignInPage;
