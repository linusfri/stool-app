import { t } from 'lib/i18n';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'components/text/text';

export default function Settings() {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <View>
        <Text>{t('settings.title')}</Text>
      </View>
    </ScrollView>
  );
}
