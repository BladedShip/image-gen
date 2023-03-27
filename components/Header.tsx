import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-[#2c2c2c] z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image src="/logo.png" width={30} height={30} alt="OpenAI Logo" />
        <div>
          <h1 className="font-bold">
            Image-Gen <span className="text-[#dbbadd]">by</span> Adithyan
            Jayakumar
          </h1>
          <h2 className="text-xs">
            Built using DALL-E 2, ChatGPT and Microsoft Azure
          </h2>
        </div>
      </div>
      <div className="items-center">
        <Link
          href="https://www.adithyan.co.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 text-sm md:text-base border border-[#dbbadd] text-[#dbbadd] flex items-center rounded-full hover:bg-[#dbbadd] hover:text-gray-900 transition duration-200"
        >
          More by me
        </Link>
      </div>
    </header>
  );
}

export default Header;
