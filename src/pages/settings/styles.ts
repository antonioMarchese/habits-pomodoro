import styled, { css } from "styled-components";
import { BaseButton } from "../../components/button";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";

interface MySliderRange extends Slider.SliderRangeProps {
  $sixty?: boolean;
}

const SwitchVariants = {
  default: css`
    background-color: ${({ theme }) => theme["gray-100"]};
    &[data-state="checked"] {
      background-color: ${({ theme }) => theme["gray-600"]};
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme["gray-600"]};
    &[data-state="checked"] {
      background-color: ${({ theme }) => theme["green-700"]};
    }
  `,
};

export const SettingsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  hr {
    width: 50%;
    height: 4px;
    border: none;
    background-color: ${({ theme }) => theme["gray-600"]};
  }

  & ${BaseButton} {
    width: 50%;
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

export const SettingsOptionContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OptionsTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;

  small {
    color: ${({ theme }) => theme["gray-500"]};
  }
`;

// Settings Slider

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SliderRoot = styled(Slider.Root)`
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100px;
  height: 8px;
  border-radius: 4px;
`;

export const SliderTrack = styled(Slider.Track)`
  background-color: ${({ theme }) => theme["gray-600"]};
  position: relative;
  flex-grow: 1;
  border-radius: 8px;
  height: 1rem;
  cursor: pointer;
`;

export const SliderRange = styled(Slider.Range)<MySliderRange>`
  position: absolute;
  background-color: ${({ theme }) => theme["green-700"]};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;

  border-radius: ${(props) => (props.$sixty ? "8px" : "none")};

  height: 100%;
`;

export const SliderThumb = styled(Slider.Thumb)`
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme["gray-400"]};
  border-radius: 10px;

  cursor: ${(props) => (props["aria-disabled"] ? "default" : "pointer")};

  outline: none;

  transition: all 200ms ease;
  &:hover {
    background-color: ${({ theme }) => theme["green-300"]};
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

// Switch
export const SwitchRoot = styled(Switch.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  ${(props) =>
    props.variant ? SwitchVariants[props.variant] : SwitchVariants.default}
`;

export const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: ${({ theme }) => theme["gray-400"]};
  border-radius: 99999px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;
