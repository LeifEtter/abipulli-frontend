import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "../providers/authContext";
import ThumbsUP from "src/assets/background/thumbs-up.png";
import TreeBG from "src/assets/background/tree-bg.png";
import { AbiPulliLogo } from "src/components/Misc/AbipulliLogo";
import { SidebarMobile } from "src/components/Sidebar/SidebarMobile";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { MiscApi } from "src/api/endpoints/misc";
import { ApiError } from "src/api/ApiError";
import { useSnackbar } from "src/hooks/useSnackbar";
import { JSX, useEffect } from "react";

interface RouterContext {
  auth: AuthContextType;
}

const BackgroundImages: React.FC = () => (
  <div className="[&>*]:absolute w-full h-full ">
    <img className="bottom-0" src={TreeBG} alt="trees-background" />
    <img
      className="w-70 right-0 bottom-3/12 hidden md:block"
      src={ThumbsUP}
      alt="thumbs-up-img"
    />
    {/* <img
      src={AbipulliMascot}
      className="w-120 right-2/12 -top-1/12"
      alt="mascot-img"
    /> */}
  </div>
);

const BackendAvailable = (): JSX.Element => {
  const showSnackbar = useSnackbar();

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        await MiscApi.test();
      } catch (error) {
        if (error instanceof ApiError) {
          showSnackbar({ message: error.message, type: "error" });
        }
      }
    };
    checkAvailability();
  }, []);

  return <Outlet />;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <main
      style={{ fontFamily: "Inter" }}
      className=""
      aria-label="AbiPulli App Hauptbereich"
    >
      <div className="relative w-full flex pl-8 pt-4" aria-label="Logo Bereich">
        <AbiPulliLogo />
      </div>
      <div
        className="flex flex-row mt-12 gap-0 sm:gap-4 items-start px-4"
        aria-label="Seitenlayout"
      >
        <nav className="block sm:hidden" aria-label="Mobile Navigation">
          <SidebarMobile />
        </nav>
        <nav className="hidden sm:block" aria-label="Sidebar Navigation">
          <Sidebar />
        </nav>
        <section
          className="flex-1 sm:flex-8/12 z-10 flex"
          aria-label="Seiteninhalt"
        >
          <BackendAvailable />
        </section>
      </div>
      <BackgroundImages />
    </main>
  ),
});

//TODO Reimplement animation
// function useNavigationDirection() {
//   const location = useLocation();
//   const prevPath = useRef(location.pathname);
//   const [direction, setDirection] = useState<"forward" | "back">("forward");

//   useEffect(() => {
//     if (location.pathname > prevPath.current) {
//       setDirection("forward");
//     } else {
//       setDirection("back");
//     }
//     prevPath.current = location.pathname;
//   }, [location.pathname]);

//   return direction;
// }

// function AnimatedOutlet() {
//   const location = useLocation();

//   const direction = useNavigationDirection();

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         className="w-full h-full"
//         key={location.pathname}
//         initial={{ y: direction == "back" ? 800 : -800, opacity: 1 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: direction == "back" ? 800 : -800, opacity: 0 }}
//         transition={{ duration: 0.3, ease: easeInOut }}
//       >
//         <Outlet />
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// <OnboardingProvider>
//   <AnimatedOutlet />
// </OnboardingProvider>
