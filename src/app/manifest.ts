import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pop Budget App",
    short_name: "Pop Budget",
    description: "Multicurrency budget app",
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
