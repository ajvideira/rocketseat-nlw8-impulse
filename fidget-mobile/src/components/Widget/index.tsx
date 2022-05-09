import React, { useRef, Component, useState } from 'react';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, TouchableOpacity, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { theme } from '../../theme';

import { styles } from './styles';
import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';
import { FeedbackTpe } from '../../../App';

function WidgetComponent() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackTpe | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function restartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
        handleStyle={styles.handle}
      >
        {feedbackSent ? (
          <Success onRestartRequest={restartFeedback} />
        ) : feedbackType ? (
          <Form
            feedbackType={feedbackType}
            onRestartRequest={restartFeedback}
            onFeebackSent={handleFeedbackSent}
          />
        ) : (
          <Options onFeedbackTypeSelect={setFeedbackType} />
        )}
      </BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetComponent) as React.FC;
