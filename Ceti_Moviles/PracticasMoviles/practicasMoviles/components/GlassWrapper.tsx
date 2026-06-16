import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export function GlassWrapper({ children, style }: Props) {
    const Wrapper = isGlassEffectAPIAvailable() ? GlassView : View;
    return <Wrapper style={style}>{children}</Wrapper>;
}
