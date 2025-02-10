/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translate(180%, 172px)" },
          "100%": { transform: "translate(-50%, 172px)" },
        },
        slideInBtn: {
          "0%": {
            transform: "translate(-50%, 180%)",
            opacity: 1
          },
          "100%": {
            transform: "translate(-50%, 0%)",
            opacity: 1
          },
        },
        slideInTitle: {
          "0%": { transform: "translate(-50%, -180%)", opacity: 1 },
          "100%": { transform: "translate(-50%, 0%)", opacity: 1 },
        },
        title: {
          "0%": { fontSize: "16px", opacity: 1 },
          "100%": { fontSize: "30px", opacity: 1 },
        },

        mine1: {
          "0%": {
            transform: "translate(100vh, 10px)"
          },
          "100%": {
            transform: "translate(-50px, 10px)"
          }
        },
        mine2: {
          "0%": {
            transform: "translate(100vh, 0)"
          },
          "100%": {
            transform: "translate(30px, 0)"
          }
        },
        mine3: {
          "0%": {
            transform: "translate(100vh, -40px)"
          },
          "100%": {
            transform: "translate(0px, -40px)"
          }
        },
        mine4: {
          "0%": {
            transform: "translateX(100vh)"
          },
          "100%": {
            transform: "translateX(10px)"
          }
        },
        mine5: {
          "0%": {
            transform: "translate(100vh, 30px)"
          },
          "100%": {
            transform: "translate(0vh, 30px)"
          }
        },
        choice: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          }
        },

        moveToPlayer: {
          "0%": {
            height: "90px",
            width: "90px",
            position: "absolute",
            transform: "translate(0px , 0px)"
          },

          "50%": {
            height: "90px",
            width: "90px",
            transform: "translate(90px, -90px)"
          },

          "100%": {
            height: "90px",
            width: "90px",
            transform: "translate(300px, -90px)"
          }
        },

        question: {
          "0%": {

          },
          "100%": {
            transform: "translate(-50%, 100%)"
          }
        },

        bad: {
          "0%": {
            height: "0px",
            width: "0%",
            opacity: "0"
          },

          "30%": {
            height: "137px",
            width: "80%",
            transform: "translate(80px, -50px)",
            opacity : "1"
          },

          "100%": {
            height: "0px",
            width: "0%",
            opacity: "0",
          }
        },

        yes: {
          "0%": {
            height: "0px",
            width: "0%",
            opacity: "0",
            zIndex : "-1"
          },

          "30%": {
            height: "137px",
            width: "80%",
            transform: "translate(80px, -50px)",
            opacity : "1"
          },

          "100%": {
            height: "0px",
            width: "0%",
            opacity: "0",
          }
        },
        triggerBomb : {
          "0%" : {

          },
          "100%" : {
            transform : "translate(19px, -80px)",
            zIndex : 1
          }
        },

        boom : {
          "0%" : {
            opacity : 0,
            scale : "0.5"
          },
          "100%" : {
            opacity : 1,
            scale : "0.8"
          }
        }
      },

      animation: {
        "slide-in": "slideIn 2s ",
        "slide-in-btn": "slideInBtn 1s forwards",
        "slide-in-title": "slideInTitle 2s forwards",
        "title": "title 1s forwards",
        "mine5": "mine5 3s",
        "mine4": "mine4 3s",
        "mine3": "mine3 3s",
        "mine2": "mine2 3s",
        "mine1": "mine1 3s",
        "choice": "choice 3s forwards",
        "move-to-player": "moveToPlayer 5s forwards",
        "question": "question 2s forwards",
        "bad" : "bad 3s forwards",
        "yes": "yes 8s forwards",
        "trigger-bomb" : "triggerBomb 1s forwards",
        "boom" : "boom 2s"
      },
    },
  },
  plugins: [],
};
