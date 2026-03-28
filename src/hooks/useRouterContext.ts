import { router } from "src/RouterContextWrapper";
import { useAuth } from "src/providers/authProvider";

export const useRouterContext = () => {
  const auth = useAuth();

  router.update({
    context: {
      auth,
    },
  });
};
