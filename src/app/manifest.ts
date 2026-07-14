import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My Budget App",
    short_name: "MBA PWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "fullscreen",
    background_color: "rgba(8, 9, 12, 1)",
    theme_color: "rgba(8, 9, 12, 1)",
    icons: [
      {
        src: "/appicon.png",
        sizes: "315x315",
        type: "image/png",
      },
    ],
    orientation: "natural",
  };
}
