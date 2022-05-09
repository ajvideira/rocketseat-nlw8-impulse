import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 28,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: 8,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
  button: {
    height: 40,
    backgroundColor: theme.colors.surface_secondary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 56,
  },
  buttonTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
});
