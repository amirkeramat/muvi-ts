"use client";
import Toggle from "@/components/ui/toggle";
import { useQuery } from "@tanstack/react-query";
import getHeroSectionData from "@/actions/getHeroSectionData";
import { useState } from "react";
import CardSlider from "@/components/ui/CardSlider";
import Loading from "@/components/ui/Loading";
import FetchLoader from "@/components/ui/FetchLoader";
import { actionList } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface HeroSectionProps {
  title: string;
  listOptions: string[];
  initialList: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  listOptions,
  initialList,
}) => {
  const session = useSession();

  const [list, setList] = useState(initialList);

  const toggleHandler = (selectedList: string) => {
    setList(selectedList);
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [title, list],
    queryFn: () => getHeroSectionData(list, title.toLowerCase()),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const onClickHandler = async (listName: string, data: actionList) => {
    try {
      if (!session?.data?.user?.email) {
        toast.error("You have to be logged in first");
      } else {
        const response = await axios.post(
          `/api/userMediaList/${listName}`,
          data
        );
        if (response.status === 201) {
          toast.error(response.data);
        } else {
          toast.success(`Added to your ${listName}`);
        }
      }
    } catch (error: any) {
      toast.error("Something went wrong", error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center md:justify-start items-center space-x-2 md:space-x-10">
        <h1 className="font-bold text-2xl md:ms-12">{title}</h1>
        <Toggle titles={listOptions} onClick={toggleHandler} />
        {isFetching && <FetchLoader />}
      </div>
      <div className="w-full relative h-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-96 w-full">
            <Loading />
          </div>
        ) : (
          <CardSlider onClick={onClickHandler} data={data!} mediaType={list} />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
