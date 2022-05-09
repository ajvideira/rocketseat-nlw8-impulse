import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

type ScreenshotButtonProps = {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveScreenshot: () => void;
};

export function ScreenshotButton({
  screenshot,
  onTakeShot,
  onRemoveScreenshot,
}: ScreenshotButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveScreenshot : onTakeShot}
    >
      {screenshot ? (
        <View>
          <Image source={{ uri: screenshot }} style={styles.image} />
          <Trash
            size={22}
            weight="fill"
            color={theme.colors.text_secondary}
            style={styles.removeIcon}
          />
        </View>
      ) : (
        <Camera size={24} weight="bold" color={theme.colors.text_primary} />
      )}
    </TouchableOpacity>
  );
}
