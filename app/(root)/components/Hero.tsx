"use client";
import { Data } from "@/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { POSTER_ORIGINAL, BACK_DROP_W300 } from "@/helpers/imageUrls";
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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import getSearchData from "@/actions/getSerachData";
import { useRouter } from "next/navigation";
interface HeroProps {
  data: Data | undefined;
}
const Hero: React.FC<HeroProps> = ({ data }) => {
  const router = useRouter()
  const formSchema = z.object({
    searchValue: z.string().min(1, "This Filed is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchValue: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    router.push(`/search?query=${data.searchValue}`)
  };

  return (
    <div className="h-96 w-full relative">
      <Swiper
      slidesPerView="auto"
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper h-96 w-full"
      >
        {data?.results.map((item) => (
          <SwiperSlide className="min-w-full" key={item.id}>
            <Image
              src={`${POSTER_ORIGINAL}${item.backdrop_path}`}
              className="w-full h-96  object-cover  object-center  relative"
              alt={item.title}
              fill
              placeholder="blur"
              blurDataURL={`${BACK_DROP_W300}${item.backdrop_path}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-yellow-800/70 h-full w-full absolute inset-0 z-10" />

      <div className="h-full w-full flex flex-col justify-center space-y-20 absolute inset-0 z-20 text-zinc-50">
        <h1 className="ps-12 font-bold font-mono text-xl md:text-5xl">
          Welcome.
        </h1>
        <p className="ps-12 text-md md:text-4xl font-semibold">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <Form {...form}>
          <form
            className="mx-6 md:mx-36"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="searchValue"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      className="placeholder:text-zinc-500 placeholder:text-xs text-zinc-900 rounded-xl bg-zinc-50 h-12"
                      type="text"
                      placeholder="Discover Millions of movies, TV shows and people... "
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    className="bg-yellow-500 absolute -top-2 right-0 px-2 text-xs md:text-base  md:px-16 h-12 rounded-xl"
                  >
                    Discover
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Hero;
