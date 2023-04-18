"use client";

import useSWR from "swr";

import fetchImages from "@/lib/fetchImages";

type Props = {};

type ImageType = {
  name: string;
  url: string;
};

function Images({}: Props) {
  const {
    data: images,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, { revalidateOnFocus: false });

  return (
    <div className="min-h-[100vh]">
      <button
        onClick={() => mutate(images)}
        className="fixed bottom-10 right-10 bg-[#2c2c2c] text-[#dbbadd] px-5 py-3 rounded-md hover:bg-[#dbbadd] focus:outline-none focus:ring-2 focus:ring-[#dbbadd] font-bold z-20 hover:text-[#2c2c2c] transition-all duration-200 ease-in-out shadow-2xl drop-shadow-lg"
      >
        {!isLoading && isValidating ? "Refreshing Images..." : "Refresh Images"}
      </button>
      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading Generated Images
        </p>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10 mb-20">
        {images?.imageUrls?.map((image: ImageType, i: number) => (
          <div
            key={image.name}
            className={`relative cursor-help  hover:scale-[103%] transition-transform duration-200 ease-in-out 
            ${i === 0 && "md:col-span-2 md:row-span-2"} ${i=== 5 && "md:col-span-2 md:row-span-2"}`}
          >
            <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-150 ease-in-out z-10">
              <p className="text-center font-light text-[#2c2c2c] text-lg p-5">
                {image.name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </div>
            <img
              src={image.url}
              alt={image.name}
              width={800}
              height={800}
              className="w-full, rounded-sm shadow-2xl drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
