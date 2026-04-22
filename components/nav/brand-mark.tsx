import type { Route } from "next";

import { AppLink } from "@/components/navigation/navigation-progress";

const homeRoute: Route = "/";

export function BrandMark() {
  return (
    <AppLink className="flex items-center text-center gap-3" href={homeRoute}>
      <svg
        className="h-12 w-12"
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="512" height="512" rx="40" fill="" />
        <path
          d="M64 256C96 180 168 128 256 128C344 128 416 180 448 256C416 332 344 384 256 384C168 384 96 332 64 256Z"
          stroke="#0F4C81"
          strokeWidth="24"
          fill="none"
        />
        <circle cx="256" cy="256" r="72" fill="#2A9D8F" />
        <circle cx="256" cy="256" r="34" fill="#0B1F33" />
        <circle cx="278" cy="232" r="12" fill="white" />
        <g transform="translate(380 110)">
          <circle cx="0" cy="0" r="42" fill="#EAF6FF" />
          <path d="M-10 -24H10V-10H24V10H10V24H-10V10H-24V-10H-10V-24Z" fill="#0F4C81" />
        </g>
      </svg>

        <span className="eyebrow">Eye Solutions</span>
     
    </AppLink>
  );
}
