"use client";
import React from "react";
import ReusableForm from "./ReusableForm";
import { z } from "zod";
import { User } from "@prisma/client";

interface ChangePassFormProps {
  user: User;
}

const ChangePassForm: React.FC<ChangePassFormProps> = ({ user }) => {
  const initialUserData = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const userSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().regex(/(?=.*\d)(?=.*[A-Z]).{8,}/g, {
      message: `
      at least one digit (0-9),
      at least one uppercase letter,
      at least one special letter,
      at least 8 letter
    `,
    }),
    confirmPassword: z.string(),
  });

  const handleSubmitUserForm = (data: any) => {
    // Handle form submission for User data here
    console.log(data);
  };

  return (
    <div className="w-full px-6 mt-6 flex flex-col border-b pb-8">
      <div className="mb-4 pb-4  font-bold text-2xl">
        <h6>Change Password:</h6>
      </div>
      <ReusableForm
        initialData={initialUserData}
        schema={userSchema}
        onSubmit={handleSubmitUserForm}
      />
    </div>
  );
};

export default ChangePassForm;
