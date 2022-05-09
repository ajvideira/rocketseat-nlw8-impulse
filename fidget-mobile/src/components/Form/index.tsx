import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';

import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { FeedbackTpe } from '../../../App';
import { api } from '../../services/api';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { Copyright } from '../Copyright';
import { ScreenshotButton } from '../ScreenshotButton';

import * as Filesystem from 'expo-file-system';

import { styles } from './styles';

type FormProps = {
  feedbackType: FeedbackTpe;
  onRestartRequest: () => void;
  onFeebackSent: () => void;
};

export function Form({
  feedbackType,
  onRestartRequest,
  onFeebackSent,
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackInfo = feedbackTypes[feedbackType];

  async function handleScreenshot() {
    const uriScreenshot = await captureScreen({ format: 'png', quality: 1 });
    setScreenshot(uriScreenshot);
  }

  function handleRemoveScreenShot() {
    setScreenshot(null);
  }

  async function handleFeedbackSubmit() {
    setIsSendingFeedback(true);

    try {
      const screenshotBase64 =
        screenshot &&
        (await Filesystem.readAsStringAsync(screenshot, {
          encoding: 'base64',
        }));

      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });

      onFeebackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    } finally {
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onRestartRequest}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onRemoveScreenshot={handleRemoveScreenShot}
          onTakeShot={handleScreenshot}
        />
        <Button
          onPress={handleFeedbackSubmit}
          isLoading={isSendingFeedback}
          disabled={!comment || isSendingFeedback}
        />
      </View>
      <Copyright />
    </View>
  );
}
