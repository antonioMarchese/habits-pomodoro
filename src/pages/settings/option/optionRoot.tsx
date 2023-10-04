import { SettingsOptionContainer } from "../styles";

export default function OptionRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsOptionContainer>{children}</SettingsOptionContainer>;
}
