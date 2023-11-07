import React from "react";
import ReusableForm from "./components/form/ReusableForm";
import { prismadb } from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { z } from "zod";
import ChangeNameForm from "./components/form/ChangeNameForm";
import ChangePassForm from "./components/form/ChangePassForm";
import ChangeAvatar from "./components/form/ChangeAvatar";

const Setting = async () => {
  const session = await getServerSession();

  const user = await prismadb.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  return (
    <div className="w-full px-6 mt-6">
      <ChangeAvatar user={user!} />
      <ChangeNameForm user={user!} />
      <ChangePassForm user={user!} />
    </div>
  );
};

export default Setting;
