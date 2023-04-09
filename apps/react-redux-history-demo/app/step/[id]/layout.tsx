"use client";

import type { ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  params: {
    id: string;
  };
}

export default function StepLayout({ children, params: { id } }: Props) {
  return (
    <div>
      {children}
      {+id > 1 && (
        <Link
          className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          href={`/step/${+id - 1}`}
        >
          Back
        </Link>
      )}
      {+id < 4 && (
        <Link
          className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          href={`/step/${+id + 1}`}
        >
          Next
        </Link>
      )}
      {+id === 4 && (
        <Link
          className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          href={{
            pathname: `/steps-completed`,
            // state: { skipBack: 4 }
          }}
        >
          Complete
        </Link>
      )}
    </div>
  );
}
