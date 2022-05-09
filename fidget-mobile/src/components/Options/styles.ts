import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  options: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: 4,
    marginBottom: 32,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
});
