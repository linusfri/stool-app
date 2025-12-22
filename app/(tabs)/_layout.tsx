import { Tabs } from 'expo-router';
import * as React from 'react';
import { t } from 'lib/i18n';
import { Icon } from 'components/ui/icon';
import { HomeIcon, MoonStarIcon, SunIcon } from 'lucide-react-native';
import { Button } from 'components/ui/button';
import { useColorScheme } from 'nativewind';
import { commonHeaderTheme } from '../../lib/constants/header/theme';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}

function HeaderRight() {
  return <ThemeToggle />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#BD2B0B',
        tabBarInactiveTintColor: '#3E3E3E',
        headerRight: () => <HeaderRight />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.tabs.items'),
          tabBarIcon: ({ color }) => <Icon as={HomeIcon} size={20} color={color} />,
          ...commonHeaderTheme
        }}
      />
    </Tabs>
  );
}
