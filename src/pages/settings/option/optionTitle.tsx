import { OptionsTitleContainer } from "../styles";

export default function OptionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <OptionsTitleContainer>
      <p>{title}</p>
      {subtitle && <small>{subtitle}</small>}
    </OptionsTitleContainer>
  );
}
