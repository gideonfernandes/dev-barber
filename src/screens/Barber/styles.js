import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? '#fff' : '#777')};
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeItem = styled.View`
  flex: 1;
  background-color: salmon;
`;

export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const FakeSwiper = styled.View``;

export const PageBody = styled.View`
  background-color: #fff;
  border-top-left-radius: 50px;
  margin-top: -50px;
  min-height: 400px;
`;

export const UserInfoArea = styled.View``;

export const ServiceArea = styled.View``;

export const TestimonialArea = styled.View``;
