import Link from "next/link";
import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <>
      <div className="w-full h-[2rem] bg-black flex justify-center items-center">
        <p>
          Made with ❤️ by{" "}
          <Link href="https://www.adithyan.co.in" className=" underline" target="_blank" rel="noopener noreferrer">Adithyan Jayakumar</Link> using
          Next.js
        </p>
      </div>
    </>
  );
}

export default Footer;
