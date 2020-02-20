import { gsap } from "gsap";

const enter = (el, cb) =>
  new Promise(resolve => {
    gsap.fromTo(
      ".cover",
      {
        y: "0%"
      },
      {
        y: "-100%",
        duration: 0.8,
        ease: "power2.inOut"
      }
    );

    gsap.fromTo(
      el,
      {
        y: innerHeight * 0.3
      },
      {
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          resolve();
          if (cb) cb();
        }
      }
    );
  });

const leave = (el, cb) =>
  new Promise(resolve => {
    gsap.fromTo(
      ".cover",
      {
        y: "100%"
      },
      {
        y: "0%",
        duration: 0.6,
        ease: "cubic.out",
        onComplete: () => {
          resolve();
          if (cb) cb();
        }
      }
    );
  });

export default { enter, leave };
