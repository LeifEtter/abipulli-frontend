import { createFileRoute } from "@tanstack/react-router";
import React from "react";

const Home: React.FC = () => <></>;

export const Route = createFileRoute("/home")({
  component: Home,
});
