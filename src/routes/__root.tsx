import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "../providers/authContext";
import ThumbsUP from "src/assets/thumbs-up.png";
import TreeBG from "src/assets/tree-bg.png";
import { AbiPulliLogo } from "src/components/Misc/AbipulliLogo";
import { SidebarMobile } from "src/components/Sidebar/SidebarMobile";
import { Sidebar } from "src/components/Sidebar/Sidebar";

interface RouterContext {
  auth: AuthContextType;
}

const BackgroundImages: React.FC = () => (
  <div className="[&>*]:absolute w-full h-full ">
    <img className="bottom-0" src={TreeBG} alt="trees-background" />
    <img
      className="w-70 right-0 bottom-3/12"
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

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div style={{ fontFamily: "Inter" }} className="px-4">
      {/* style={{ fontFamily: "Onest" }} */}
      <AbiPulliLogo />
      <div className="flex flex-row mt-16 gap-0 sm:gap-4 items-start">
        <div className="block sm:hidden">
          <SidebarMobile />
        </div>
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <div className="flex-1 sm:flex-8/12 z-10 flex">
          <Outlet />
        </div>
      </div>
      <BackgroundImages />
    </div>
  ),
});

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
