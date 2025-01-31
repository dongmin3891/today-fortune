import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function FortuneBagIcon(props: any) {
    return (
        <Svg width={120} height={120} viewBox="0 0 24 24" fill={props.color || '#7F5AF0'} {...props}>
            <Path d="M12 2L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-8-6zm0 2.5L18 9H6l6-4.5zM6 20V11h12v9H6z" />
        </Svg>
    );
}
