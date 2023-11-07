"use client";
import React from "react";
import ReusableForm from "./ReusableForm";
import { z } from "zod";
import { User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";

interface ChangeAvatarProps {
  user: User;
}

const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ user }) => {
  const initialUserData = {
    imageUrl: user?.image ? user.image : "/placeholder.jpg",
    password: "",
    confirmPassword: "",
  };

  const userSchema = z.object({
    imageUrl: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  });

  const form = useForm({
    defaultValues:{
        ...initialUserData
    }
  });

  const handleSubmitUserForm = (data: any) => {
    // Handle form submission for User data here
    console.log(data);
  };

  return (
    <div className="w-full px-6 mt-6 flex flex-col border-b pb-8">
      <div className="mb-4 pb-4  font-bold text-2xl">
        <h6>Change Avatar:</h6>
      </div>
      <div>
        <Form {...form}>
          <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Avatar:</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password:</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirmPassword:</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-4 col-span-1 md:col-span-2">
              <Button variant="default" type="submit">
                Submit
              </Button>
              <Button variant="destructive" type="button">
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangeAvatar;
