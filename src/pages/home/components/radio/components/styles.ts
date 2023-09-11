import * as Slider from "@radix-ui/react-slider";
import { styled } from "styled-components";

export const ControlContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.white};
    padding: 0.5rem;
    font-size: 1.5rem;
    border-radius: 50%;

    opacity: 0.8;
    transition: opacity 200ms ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`;

export const StopPlayControlContainer = styled.div`
  button {
    font-size: 2rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme["gray-600"]};
    color: ${({ theme }) => theme["green-500"]};

    transition: all 200ms ease-in;

    &:hover {
      color: ${({ theme }) => theme["green-300"]};
    }
  }
`;

export const DisplayTrackContainer = styled.div`
  width: 100%;
  overflow: hidden;
  h1 {
    font-size: 1rem;
    text-align: center;
    /* white-space: nowrap; */
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;

// Slider

export const SliderRoot = styled(Slider.Root)`
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  /* border: 1px solid white; */
`;
export const SliderTrack = styled(Slider.Track)`
  background-color: ${({ theme }) => theme["gray-600"]};
  position: relative;
  flex-grow: 1;
  border-radius: 50%;
  height: 4px;
  cursor: pointer;
`;

export const SliderRange = styled(Slider.Range)`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  height: 100%;
`;

export const SliderThumb = styled(Slider.Thumb)`
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: white;
  border-radius: 10px;

  cursor: pointer;

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
