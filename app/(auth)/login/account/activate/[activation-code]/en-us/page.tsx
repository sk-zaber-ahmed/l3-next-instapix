"use client";

import { useParams } from "next/navigation";
import React from "react";

const AccountActivationPage = () => {
  const params = useParams();
  console.log("params:", params);

  return <div>AccountActivationPage</div>;
};

export default AccountActivationPage;
