// components/notes-skeleton.tsx

import { SKELETON_NOTES } from "@/constants/note-skeletons";

function SkeletonNote({ w, h, rotate, color, delay, top, left }: typeof SKELETON_NOTES[0]) {
  return (
    <div
      className={`absolute ${w} ${h} ${rotate} ${color} ${top} ${left} rounded-sm shadow-md p-4 flex flex-col gap-3`}
      style={{ animationDelay: delay }}
    >
      {/* Pin */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-300/60 shadow-inner"/>

      {/* Lines shimmer */}
      <div className="flex flex-col gap-2 mt-3">
        <div
          className="h-2.5 rounded-full bg-gray-300/50 animate-pulse"
          style={{ width: '85%', animationDelay: delay }}
        />
        <div
          className="h-2.5 rounded-full bg-gray-300/50 animate-pulse"
          style={{ width: '70%', animationDelay: delay }}
        />
        <div
          className="h-2.5 rounded-full bg-gray-300/50 animate-pulse"
          style={{ width: '90%', animationDelay: delay }}
        />
        <div
          className="h-2.5 rounded-full bg-gray-300/50 animate-pulse"
          style={{ width: '60%', animationDelay: delay }}
        />
      </div>

      {/* Bottom timestamp shimmer */}
      <div className="mt-auto">
        <div
          className="h-2 rounded-full bg-gray-300/40 animate-pulse"
          style={{ width: '45%', animationDelay: delay }}
        />
      </div>
    </div>
  )
}

export function NotesSkeleton() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Cork board texture background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(139,90,43,0.15) 1px, transparent 0)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.08) 100%)'
        }}
      />

      {/* Skeleton notes */}
      {SKELETON_NOTES.map((note, i) => (
        <SkeletonNote key={i} {...note} />
      ))}

      {/* Loading label */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-400 text-sm font-medium tracking-wide">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: '0ms' }}/>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: '150ms' }}/>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: '300ms' }}/>
      </div>
    </div>
  )
}
