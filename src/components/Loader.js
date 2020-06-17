import PropTypes from "prop-types";
import React from "react";
import styled, { keyframes } from "styled-components";
import LoaderSVG from "./react-ccv-components/assets/svg/loader.svg";

/*
  inner components
*/
const spin = keyframes` 100% { transform: rotate(360deg); } `;

const LoaderWrapper = styled.div`
  svg {
    #rays {
      transform-origin: center;
      transform-box: fill-box;
      animation: ${spin} 7s linear infinite;
    }
  }
`;

/*
  outer Loader component
*/
const Loader = ({ height, ...restProps }) => (
  <LoaderWrapper {...restProps}>
    <LoaderSVG width={Math.floor(height * 0.77)} height={height} />
  </LoaderWrapper>
);

Loader.propTypes = {
  height: PropTypes.number
};

Loader.defaultProps = {
  height: 250
};

export default Loader;