import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Text } from 'react-native';


type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Text>hola</Text>


  );
}
