import { imageLogo } from '@group4officesupplies/common/constants/imagePath';
import { Box, Image, Spinner, Text } from 'native-base';
import React from 'react';

const SplashLoading = () => {
  return (
    <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Box width={'130px'} height={'107px'}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={imageLogo.LOGO_SPLASH}
          alt="splash-image"
          resizeMode="cover"
          key={imageLogo.LOGO_SPLASH}
        />
      </Box>
      <Spinner />
    </Box>
  );
};

export default SplashLoading;
