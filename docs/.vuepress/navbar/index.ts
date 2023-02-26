import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "Getting Started", icon: "discover", link: "/getting-started/" },
  {
    text: "Features",
    icon: "creative",
    prefix: "/features/",
    children: [
      {
        text: "Update Loop",
        icon: "creative",
        link: "update/",
      },
      {
        text: "Easing",
        icon: "creative",
        link: "easing/",
      },
      {
        text: "Conflict Solving",
        icon: "creative",
        link: "conflict/",
      },
      {
        text: "Multiple Targets",
        icon: "creative",
        link: "array/",
      }
    ]
},
  {
    text: "Guides",
    icon: "creative",
    prefix: "/guides/",
    children: [
      {
        text: "Basic",
        icon: "creative",
        children: [
            {
                text: "Animate",
                icon: "creative",
                link: "animate/",
            },
            {
                text: "AnimateFlow",
                icon: "creative",
                link: "animateFlow/",
            }
        ]
      },
      {
        text: "HTML / CSS",
        icon: "creative",
        children: [
            {
                text: "AnimateCSS",
                icon: "creative",
                link: "animateCSS/"
            },
            {
                text: "AnimateTypo",
                icon: "config",
                link: "animateTypo/"
            }
        ]
      }
    ],
  },
  // {
  //   text: "V2 Docs",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.press/",
  // },
]);
