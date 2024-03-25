import React from "react";

import type { ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

import { icons } from "~/theme/svg-icons";

/**
 * Renders the vector icon component
 *
 * @param props - vector icon props
 */
export function VectorIcon(props: Props) {
  const { name, ...rest } = props;
  const SVG = icons[name];

  return <SVG {...rest} />;
}
/** Type definitions */
interface Props {
  name: keyof typeof icons;
  color?: string;
  style?: ViewStyle;
  width?: SvgProps["width"];
  height?: SvgProps["height"];
  viewBox?: SvgProps["viewBox"];
  preserveAspectRatio?: SvgProps["preserveAspectRatio"];
}
