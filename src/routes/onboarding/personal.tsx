import { createFileRoute, Link } from "@tanstack/react-router";
import { ClickToLogin } from "src/components/Onboarding/ClickToLogin";
import { useOnboardingInfo } from "src/hooks/useOnboardingInfo";

export const Route = createFileRoute("/onboarding/personal")({
  component: RouteComponent,
});

function RouteComponent() {
  const { saveProgressLocally } = useOnboardingInfo();

  return (
    <div>
      <div className="bg-white shadow-ap-special-shadow rounded-xl px-12 pt-10 pb-5 max-w-200">
        <h1 className="text-3xl font-medium text-ap-new-black">Über Dich</h1>
        <p className="text-md text-gray-600">
          Damit wir dein Profil anlegen können brauchen wir ein Paar Infos von
          dir. Diese Infos werden gelöscht falls du den Prozess abbrichst, also
          keine Angst!
        </p>
        <div className="flex"></div>
        <div className="flex w-full justify-between h-20 mt-2">
          <ClickToLogin className="self-end" to="/login" />
          <button className="self-start cursor-pointer bg-abipulli-green shadow-ap-button py-1.5 px-4 rounded-md border font-semibold min-w-40 text-md hover:translate-y-2 hover:shadow-none">
            {`Nächster Schritt ->`}
          </button>
        </div>
      </div>
    </div>
  );
}
