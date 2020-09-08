import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import {
  Container,
  Scroller,
  SwipeDot,
  SwipeItem,
  SwipeImage,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  TestimonialArea,
} from './styles';

import Api from '../../Api';

const Barber = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      const response = await Api.getBarber(route.params.id);

      if (response.error === '') {
        setUserInfo(response.data);
      } else {
        // eslint-disable-next-line no-alert
        alert(`Error: ${response.error}`);
      }

      setLoading(false);
    };

    getBarberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDot active />}
            paginationStyle={{top: 16, right: 16, bottom: null, left: null}}
            autoplay
            autoplayTimeout={4}>
            {userInfo.photos.map((photo, index) => (
              <SwipeItem key={index}>
                <SwipeImage source={{uri: photo.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}
        <PageBody>
          <UserInfoArea />
          <ServiceArea />
          <TestimonialArea />
        </PageBody>
      </Scroller>
    </Container>
  );
};

export default Barber;
