import { router } from "../main";
import { useAuth } from "./useAuth";

export const useRouterContext = () => {
  const auth = useAuth();

  router.update({
    context: {
      auth,
    },
  });
};
