'use client';

import { styled } from "styled-components";
import { useTheme } from "../context/ThemeContext";
import Image from 'next/image';
import { COLORS } from "@/app/constants/colors";

export const StyledHeadingDiv = styled.div<{ isDark?: boolean; fontSize?: string }>`
  color: ${(props) => (props.isDark ? COLORS.text.light : COLORS.text.primary)};
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  height: fit-content;
  margin-top: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 150px;
`;

const StyledSpan = styled.span<{ isDark?: boolean }>`
  color: ${COLORS.accent};
  font-family: cursive;
`;

const StyledSpan2 = styled.span<{ isDark?: boolean }>`
  color: ${(props) => (props.isDark ? COLORS.text.light : COLORS.text.primary)};
  font-family: cursive;
`;

interface LogoInterface {
  fontSize: string;
  onClickHandler?: () => void;
  isDark?: boolean;
}

const LogoComponent = ({ fontSize, onClickHandler, isDark }: LogoInterface) => {
  const { theme } = useTheme();
  
  return (
    <StyledHeadingDiv
      isDark={isDark}
      fontSize={fontSize}
      onClick={onClickHandler}
    >
      <div className="relative w-6 h-6 mr-1">
        <Image
          src="/vricon.png"
          alt="VR Nursery Logo"
          fill
          className="object-contain"
        />
      </div>
      <StyledSpan isDark={isDark}>VR</StyledSpan>
      <StyledSpan2 isDark={isDark}>Nursery</StyledSpan2>
    </StyledHeadingDiv>
  );
};

export default LogoComponent; 