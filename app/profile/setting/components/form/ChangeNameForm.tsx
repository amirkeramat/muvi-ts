"use client";
import React from "react";
import ReusableForm from "./ReusableForm";
import { z } from "zod";
import { User } from "@prisma/client";

interface ChangeNameFormProps {
  user: User;
}

const ChangeNameForm: React.FC<ChangeNameFormProps> = ({ user }) => {
  const initialUserData: any = {
    name: user.name,
    password: "",
    confirmPassword: "",
  };

  const userSchema = z.object({
    name: z.string().min(4),
    password: z.string(),
    confirmPassword: z.string(),
  });

  const handleSubmitUserForm = (data: any) => {
    // Handle form submission for User data here
    console.log(data);
  };

  return (
    <div className="w-full px-6 mt-6 flex flex-col border-b pb-8">
      <div className="mb-4 pb-4  font-bold text-2xl">
        <h6>Change Name:</h6>
      </div>
      <ReusableForm
        initialData={initialUserData}
        schema={userSchema}
        onSubmit={handleSubmitUserForm}
      />
    </div>
  );
};

export default ChangeNameForm;
