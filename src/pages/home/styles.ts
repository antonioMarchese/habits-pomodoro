import * as Slider from "@radix-ui/react-slider";
import { styled } from "styled-components";
import { BaseButton } from "../../components/button";

interface TextAreaContainerProps extends React.HTMLProps<HTMLDivElement> {
  animate: "hide" | "appear";
}

export const HomeContainer = styled.main`
  width: 100%;
  flex: 1;

  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3rem;
  padding: 1rem;

  form {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const Title = styled.div`
  max-width: 80%;
  text-align: center;
  p {
    font-size: 2rem;
  }
`;

export const StartCountdownButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["green-500"]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseButton)`
  flex: 1;
  background-color: ${({ theme }) => theme["red-500"]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme["red-700"]};
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const RoundContainer = styled.div`
  position: absolute;
  width: 100px;
  left: 10%;
  top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
`;

export const RoundContainerHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextAreaContainer = styled.div<TextAreaContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: ${({ animate }) => (animate === "appear" ? 1 : 0)};
  transition: all 300ms ease-in-out;
  visibility: ${({ animate }) => (animate === "appear" ? "visible" : "hidden")};
  width: ${({ animate }) => (animate === "appear" ? "100%" : "0px")};
  overflow-y: hidden;

  button {
    background-color: ${({ theme }) => theme["green-500"]};
    transition: all 250ms ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme["green-300"]};
    }

    &:active {
      background-color: ${({ theme }) => theme["green-700"]};
    }
  }
`;

export const TextArea = styled.textarea`
  display: flex;
  width: 100%;
  padding: 8px;
  color: ${({ theme }) => theme["text-color"]};
  background-color: transparent;
  border-radius: 8px;
  height: 10rem;
  resize: none;
`;

// Slider
export const RoundSliderRoot = styled(Slider.Root)`
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  cursor: default;
`;

export const RoundSliderTrack = styled(Slider.Track)`
  background-color: ${({ theme }) => theme["gray-600"]};
  position: relative;
  flex-grow: 1;
  border-radius: 4px;
  height: 4px;
  cursor: default;
`;

export const RoundSliderRange = styled(Slider.Range)`
  position: absolute;
  background-color: ${({ theme }) => theme["green-700"]};
  border-radius: 4px;
  height: 100%;
`;
