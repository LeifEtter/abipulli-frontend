import { router } from "src/RouterContextWrapper";
import { useAuth } from "./useAuth";

export const useRouterContext = () => {
  const auth = useAuth();

  router.update({
    context: {
      auth,
    },
  });
};
