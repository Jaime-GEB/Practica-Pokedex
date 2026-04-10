import React from "react";

type PokedexLayoutProps = {
  topScreen?: React.ReactNode;
  bottomScreen?: React.ReactNode;
};

export default function PokedexLayout({
  topScreen,
  bottomScreen,
}: PokedexLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 font-sans overflow-hidden">

      {/* Pokedex Container - Scaled up to fill screen on larger devices */}
      <div className="flex flex-col items-center relative scale-[0.7] sm:scale-100 md:scale-100 lg:scale-[1.2] xl:scale-[1.4] 2xl:scale-[2] origin-center">

        {/* --- TOP HALF --- */}
        <div className="relative z-20">
          {/* The "Ear" - Left protrusion */}
          <div className="absolute -left-36 bottom-10 w-25 h-50 bg-red-600 rounded-l-[10rem] border-l-4 border-t-4 border-b-4 border-red-800 flex flex-col justify-center items-center gap-2 pl-2 shadow-lg overflow-hidden">
            {/* Speaker Holes */}
            <div className="grid grid-cols-2 left-7 gap-10 rotate-45 relative z-22">
              <div className="w-2.5 h-2.5 bg-red-900 rounded-full inset-shadow z-22"></div>
              <div className="w-2.5 h-2.5 bg-red-900 rounded-full inset-shadow z-22"></div>
              <div className="w-2.5 h-2.5 bg-red-900 rounded-full inset-shadow z-22"></div>
              <div className="w-2.5 h-2.5 bg-red-900 rounded-full inset-shadow z-22"></div>
            </div>
            {/* Ear Connector to Body */}
          </div>
          <div className="absolute -left-12 bottom-10 w-13 h-50 bg-red-600 border-t-4 border-b-4 border-red-800 z-21" />
          {/* Main Top Body */}
          <div className="w-120 h-70 bg-red-600 rounded-tl-lg rounded-tr-3xl border-4 border-red-800 p-4 relative shadow-xl z-20 overflow-hidden">
            {/* Screen Bezel */}
            <div className="absolute right-5 top-10 w-108 h-50 bg-zinc-800 border-2 border-zinc-900 rounded-lg z-21 overflow-hidden" />
            <div className="w-100 p-4 ml-2 rounded z-22">
              <div className="bg-zinc-300 p-2 rounded-lg shadow-2xl border-2 border-zinc-600 relative z-22">
                {/* Top Camera/Mic */}
                <div className="absolute top-24 left-95 w-2 h-2 rounded-full bg-black z-10"></div>

                {/* Actual Screen */}
                <div className="bg-cyan-200 h-48 rounded border border-zinc-700 overflow-hidden relative">
                  {/* Main Screen Content */}
                  <div className="h-full">
                    {topScreen}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* --- HINGE --- */}
        <div className="w-120 h-8 bg-gradient-to-b from-red-700 via-red-500 to-red-700 border-x-4 border-red-800 z-10 relative shadow-inner flex items-center justify-center">
          <div className="w-40 h-8 bg-gradient-to-b from-red-700 via-red-500 to-red-700 border-l-4 border-red-800 z-10 relative shadow-inner flex flex-start" />
          <div className="w-1 h-3 bg-black rounded-[0.1rem] opacity-70"></div>
          <div className="w-40 h-8 bg-gradient-to-b from-red-700 via-red-500 to-red-700 border-r-4 border-red-800 z-10 relative shadow-inner flex flex-end" />
        </div>


        {/* --- BOTTOM HALF --- */}
        <div className="relative z-20">
          {/* The "Handle" - Left Control Grip */}
          <div className="absolute -left-40 top-0 w-40 h-full bg-zinc-700 rounded-l-[15rem] border-3 border-y-3 border-zinc-800 inset-shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute left-18 top-19 w-30 h-30 bg-zinc-700 rounded-[10rem] border-3 border-y-3 border-zinc-900 inset-shadow-2xl flex items-center justify-center z-22">
              {/* D-Pad */}
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-1/3 w-1/3 h-full bg-zinc-300 rounded"></div>
                <div className="absolute top-1/3 left-0 w-full h-1/3 bg-zinc-300 rounded"></div>
                <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-zinc-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* The "Wheel" - Right Control */}
          <div className="absolute -right-30 top-1/2 -translate-y-1/2 w-32 h-32 bg-zinc-800 rounded-r-full border-4 border-zinc-900 shadow-2xl flex items-center justify-center z-0">
            {/* Inner Wheel Detail */}
            <div className="w-24 h-24 rounded-full border-2 border-zinc-800 bg-zinc-400 relative flex items-center justify-center">
              <div className="w-18 h-18 rounded-full border-2 border-zinc-800 bg-zinc-400 relative flex items-center justify-center">
                {/* Inner Wheel Detail */}
                <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-black z-22"></div>
                {/* Inner Wheel Center */}
                <div className="w-12 h-12 bg-green-500 rounded-full border-6 border-black shadow-[0_0_10px_#22c55e]"></div>
              </div>
            </div>
          </div>


          {/* Main Bottom Body */}
          <div className="w-120 h-70 bg-red-600 rounded-br-3xl border-t-3 border-r-3 border-b-3 border-red-800 p-4 shadow-xl relative z-10 overflow-hidden">

            {/* Bottom Screen Container */}
            <div className="absolute right-155 top-32 w-4 h-4 bg-green-500 rounded-l-[15%] z-24 shadow-[0_0_10px_#22c55e]" />
            {/* Screen Container Left */}
            <div className="absolute right-50 top-7 w-100 h-55 bg-zinc-800 border-2 border-zinc-900 rounded-l-full z-21 shadow-2xl" />
            {/* Screen Container Right */}
            <div className="absolute right-6 top-7 w-30 h-55 bg-zinc-800 border-2 border-red-900 rounded-br-4xl rounded-tr-lg z-21 shadow-2xl" />
            {/* Screen Container Container */}
            <div className="absolute -top-0 w-99 p-4 ml-3 rounded z-22">
              {/* Screen Container Container Contorn */}
              <div className="bg-zinc-300 p-2 rounded-lg border-2 border-zinc-600 relative z-22">
                {/* Actual Screen */}
                <div className="bg-cyan-200 h-55 rounded border border-zinc-700 overflow-hidden shadow-2xl relative">
                  {/* Main Screen Content */}
                  <div className="h-full">
                    {bottomScreen}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Screen Container Buttons */}
            <div className="absolute right-12 bottom-14 flex flex-col gap-2 z-22">
              <div className="w-3 h-3 bg-zinc-300 rounded-full border border-black shadow"></div>
              <div className="w-3 h-3 bg-zinc-300 rounded-full border border-black shadow"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
