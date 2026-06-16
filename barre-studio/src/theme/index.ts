import { colors } from "./colors";
import { spacing, radius } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors,
  spacing,
  radius,
  typography,
} as const;

export { colors, spacing, radius, typography };
