import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/testing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/testing"!</div>;
}

// export const TestingPage = () => (
//   <>
//     <h1 className="font-semibold text-center pt-5">
//       Teste Verschiedene Image Generation Varianten
//     </h1>
//   </>
// );
