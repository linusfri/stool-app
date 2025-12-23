import { Platform } from 'react-native';

/**
 * Have not implemented nativewind support for react native headers.
 * More suffering than it's worth right now.
 * */
export const commonHeaderTheme = {
  headerTitleStyle: {
    color: '#3E3E3E', // gray-700, cannot use nativewind color here
    fontFamily: 'OpenSans_600SemiBold', // font-semibold
    fontSize: 20,
  },
  headerTitleAlign: 'left',
  headerTitleContainerStyle: {
    width: '100%',
  },
  headerStyle: {
    shadowColor: 'transparent',
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
    height: Platform.OS === 'ios' ? 115 : 80,
  },
} as const;

export const commonSubPageHeaderTheme = {
  headerTitleStyle: {
    ...commonHeaderTheme.headerTitleStyle,
    fontFamily: 'OpenSans_700Bold', // font-bold
    fontSize: 14,
  },
  headerStyle: {
    ...commonHeaderTheme.headerStyle,
    backgroundColor: 'hsl(0 0% 100%)',
    borderBottomWidth: 0,
    height: Platform.OS === 'ios' ? 115 : 105,
  },
  headerBackButtonDisplayMode: 'minimal',
  headerTitleAlign: 'center',
} as const;
