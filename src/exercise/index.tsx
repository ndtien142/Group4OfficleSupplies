import { EXERCISE_SEVEN, EXERCISE_SIX } from '@group4officesupplies/common/constants/route.constant';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExerciseContainer = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text color={'black'} fontSize={'2xl'} fontWeight={600}>
        Exercise screen
      </Text>
      <Button
        variant={'outline'}
        onPress={() => navigation.navigate(EXERCISE_SEVEN as never)}>
        Bai tap 6
      </Button>
      <Button
        variant={'outline'}
        onPress={() => navigation.navigate(EXERCISE_SIX as never)}>
        Bai tap 7``
      </Button>
    </SafeAreaView>
  );
};

export default ExerciseContainer;
