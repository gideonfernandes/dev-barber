import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

const StarArea = styled.View`
  flex-direction: row;
`;

const StarRating = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #777;
`;

const Stars = ({stars, showNumber}) => {
  const starsShape = [0, 0, 0, 0, 0];
  const floor = Math.floor(stars);
  const left = stars - floor;

  for (var i = 0; i < floor; i++) {
    starsShape[i] = 2;
  }
  if (left > 0) {
    starsShape[i] = 1;
  }

  return (
    <StarArea>
      {starsShape.map((star, index) => (
        <View key={index}>
          {star === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />}
          {star === 1 && <StarHalf width="18" height="18" fill="#ff9200" />}
          {star === 2 && <StarFull width="18" height="18" fill="#ff9200" />}
        </View>
      ))}
      {showNumber && <StarRating>{stars}</StarRating>}
    </StarArea>
  );
};

export default Stars;
