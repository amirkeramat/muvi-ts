"use client";
import * as z from "zod";
import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BsEye,
  BsEyeSlash,
  BsGithub,
  BsGoogle,
} from "react-icons/bs";

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
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/profile");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const formSchema = z.object({
    name: z.string(),
    email: z.string().email().min(1, { message: "Required" }),
    password: z.string().regex(/(?=.*\d)(?=.*[A-Z]).{8,}/g, {
      message: `
        at least one digit (0-9),
        at least one uppercase letter,
        at least one special letter,
        at least 8 letter
      `,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            console.log(callback.error);
          }
          if (callback?.ok && !callback?.error) {
            console.log("logged in");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          console.log(callback.error);
        }
        if (callback?.ok && !callback?.error) {
          console.log("logged in");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
            my-12
            max-w-full
            sm:max-w-md
            sm:mx-auto
        "
    >
      <div
        className="
            w-full
            md:w-[350px]
            bg-zinc-50
            dark:bg-zinc-900
            rounded-md
            ring-1
            ring-zinc-900/10
            dark:ring-zinc-100
            px-4
            py-8
            sm:px-6
            shadow-md
       "
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {variant === "REGISTER" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your Full name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your Email ..."
                      {...field}
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
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Your Password ..."
                        {...field}
                      />
                      <button
                        className="absolute right-2 top-3"
                        type="button"
                        onClick={() => setShowPass((prv) => !prv)}
                      >
                        {showPass ? <BsEye /> : <BsEyeSlash />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full">
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <p className="bg-zinc-50 dark:bg-zinc-900  text-gray-500">
              {" "}
              Or Continue With
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 px-2 mt-4">
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
          />
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            {variant === "LOGIN" ? "New user?" : "Already have an account? "}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer text-sm text-gray-500"
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
