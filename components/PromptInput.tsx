"use client";

import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { toast } from "react-hot-toast";

import fetchSuggestion from "@/lib/fetchSuggestion";
import fetchImages from "@/lib/fetchImages";

type Props = {};

function PromptInput({}: Props) {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestion, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    const pr = useSuggestion ? suggestion : inputPrompt || suggestion;

    const notifPrompt = pr;
    const notifPromptMin = notifPrompt?.slice(0, 20);

    const notif = toast.loading(
      'Generating Image for "' + notifPromptMin + '..."'
    );

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: pr }),
    });
    if (res) {
      toast.success('Generated Image for "' + notifPromptMin + '"!', {
        id: notif,
      });
    } else {
      toast.error("Something went wrong. Please try again.", {
        id: notif,
      });
    }

    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  const handleTabPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && input === "") {
      e.preventDefault();
      setInput(suggestion);
    }
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row md:space-x-2 space-y-2 md:sapce-y-0"
        onSubmit={handleSubmit}
      >
        <input
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "Thinking of a suggestion") ||
            suggestion ||
            "Enter a prompt"
          }
          onKeyDown={handleTabPress}
          className="flex-1 p-4 outline-none rounded-xl bg-[#2c2c2c] min-h-16 lg:min-h-20 shadow-md shadow-black/5 border-[#000000]/10 border"
        />
        <button
          type="submit"
          disabled={!input}
          className={`p-4 ${
            input
              ? "bg-[#fae4f5] text-[#2c2c2c] transition-colors duration-200 rounded-xl"
              : "text-gray-400 cursor-not-allowed "
          }`}
        >
          Generate
        </button>
        <button
          onClick={() => {
            submitPrompt(true);
            mutate;
          }}
          type="button"
          className="rounded-xl p-4 bg-[#dbbadd] text-[#2c2c2c] transition-colors duration-200 font-bold disabled:text-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Use Suggestion
        </button>
        <button
          onClick={mutate}
          type="button"
          className="rounded-xl p-4 bg-[#2c2c2c] text-[#dbbadd] transition-colors duration-200 font-bold disabled:text-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          New Suggestion
        </button>
      </form>
      {input && suggestion != input && (
        <p className="italic pt-2 pl-2 font-light">
          {" "}
          Suggestion "{" "}
          <span className="text-[#dbbadd]">
            {loading ? "Thinking of a suggestion" : suggestion}
          </span>
          "
        </p>
      )}
    </div>
  );
}

export default PromptInput;
