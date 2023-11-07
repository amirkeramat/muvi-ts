"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

interface UserFormProps<T> {
  initialData: any;
  schema: z.ZodObject<any>;
  onSubmit: (data: any) => void;
}

function ReusableForm<T>({ initialData, schema, onSubmit }: UserFormProps<T>) {
  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...initialData,
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={form.handleSubmit((data: FormData) => {
            onSubmit(data);
          })}
        >
          {Object.keys(schema.shape).map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{key}:</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder={key}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
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
  );
}

export default ReusableForm;
