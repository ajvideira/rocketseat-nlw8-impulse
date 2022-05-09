import React from 'react';

import { Text, View } from 'react-native';
import { FeedbackTpe } from '../../../App';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Copyright } from '../Copyright';
import { Option } from '../Option';

import { styles } from './styles';

type OptionsProps = {
  onFeedbackTypeSelect: (feedbackType: FeedbackTpe) => void;
};

export function Options({ onFeedbackTypeSelect }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(
          ([feedbackTypeKey, feedbackTypeValue]) => (
            <Option
              key={feedbackTypeKey}
              title={feedbackTypeValue.title}
              image={feedbackTypeValue.image}
              onPress={() =>
                onFeedbackTypeSelect(feedbackTypeKey as FeedbackTpe)
              }
            />
          )
        )}
      </View>

      <Copyright />
    </View>
  );
}
