// import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full h-full items-center justify-between font-mono text-sm flex">
        <h1 className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit">
          react-redux-history@1.5.7
        </h1>
        <div className="flex flex-col w-full justify-center items-center mt-32 bg-gradient-to-t from-black via-black">
          {/*<Link*/}
          {/*  className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded"*/}
          {/*  href="/step/1"*/}
          {/*>*/}
          {/*  Start*/}
          {/*</Link>*/}
          <h2 className="text-gray-400 underline underline-offset-8 decoration-dotted">
            Testing playground
          </h2>
          <h2 className="mt-10">Coming soon...</h2>
        </div>
      </div>
    </main>
  );
}
