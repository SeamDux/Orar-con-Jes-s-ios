import { Text as DefaultText, useColorScheme, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export type TextProps = DefaultText['props'] & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'defaultSemiBold' | 'title' | 'subtitle' | 'link';
};

export function ThemedText(props: TextProps) {
  const { style, lightColor, darkColor, type = 'default', ...otherProps } = props;
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? darkColor : lightColor;

  const getStyle = () => {
    switch (type) {
      case 'default':
        return styles.default;
      case 'defaultSemiBold':
        return styles.defaultSemiBold;
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'link':
        return styles.link;
      default:
        return styles.default;
    }
  };

  return (
    <DefaultText
      style={[
        getStyle(),
        { color },
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
