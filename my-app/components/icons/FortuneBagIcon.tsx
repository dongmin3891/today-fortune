import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
};

export function FortuneBagIcon({ size = 24, color = '#000' }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
