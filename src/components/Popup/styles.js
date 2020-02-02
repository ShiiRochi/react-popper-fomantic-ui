import styled, { css } from "styled-components";

const popperBoxMargin = props => {
  switch (props.placement) {
    case 'top':
      return css`
        margin-bottom: 0.71428571em !important;
      `
    case 'left':
      return css`
        margin-right: 0.71428571em !important;
      `
    case 'right':
      return css`
        margin-left: 0.71428571em !important;
      `
    case 'bottom':
    default:
      return css`
        margin-top: 0.71428571em !important;
      `
  }
};

export const PopperBox = styled('div')`
  ${props => props.popperStyle};
  ${popperBoxMargin};
  &::before {
    display: none;
  }
`;

const arrowPlacement = ({ placement, inverted }) => {
  switch (placement) {
    case 'top':
      return css`
        bottom: -.30714286em;
        margin-left: -.30714286em;
        //transform: rotate(45deg) translateX(20%) translateY(-25%);
        transform: translateX(25%) rotate(45deg);
        box-shadow: ${inverted ? 'none' : '1px 1px 0 0 #bababc'};
      `
    case 'left':
      return css`
        right: -.30714286em;
        margin-top: -.30714286em;
        transform: translateY(25%) rotate(45deg);
        box-shadow: ${inverted ? 'none' : '1px -1px 0 0 #bababc'};
      `
    case 'right':
      return css`
        left: -.30714286em;
        margin-top: -.30714286em;
        transform: translateY(25%) rotate(45deg);
        box-shadow: ${inverted ? 'none' : '-1px 1px 0 0 #bababc'};
      `
    case 'bottom':
    default:
      return css`
        top: -.30714286em;
        margin-left: -.30714286em;
        transform: translateX(25%) rotate(45deg);
        box-shadow: ${inverted ? 'none' : '-1px -1px 0 0 #bababc'};
      `
  }
};

const arrowBackground = props => {
  const { inverted } = props;
  return css`
    background: ${inverted ? '#1b1c1d' : '#fff'};  
  `;
};

export const Arrow = styled('div')`
  position: absolute;
  width: .71428571em;
  height: .71428571em;
  z-index: 1901;
  ${arrowBackground};
  ${arrowPlacement};
`;