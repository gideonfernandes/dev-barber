import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';

import {
  Container,
  Scroller,
  SwipeDot,
  SwipeItem,
  SwipeImage,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  UserAvatar,
  UserInfo,
  UserName,
  UserFavButton,
  LoadingIcon,
  ServiceArea,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ChooseServiceButton,
  ChooseServiceButtonText,
  TestimonialArea,
  BackButton,
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

  const handleBackButton = () => {
    navigation.goBack();
  };

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
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />

            <UserInfo>
              <UserName>{userInfo.name}</UserName>
              <Stars stars={userInfo.stars} showNumber />
            </UserInfo>

            <UserFavButton>
              <FavoriteIcon width="24" height="24" fill="#ff0000" />
            </UserFavButton>
          </UserInfoArea>

          {loading && <LoadingIcon size="large" color="#333" />}

          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de Serviços</ServicesTitle>
              {userInfo.services.map((service, index) => (
                <ServiceItem key={index}>
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServicePrice>R$ {service.price}</ServicePrice>
                  </ServiceInfo>
                  <ChooseServiceButton>
                    <ChooseServiceButtonText />
                  </ChooseServiceButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}

          {userInfo.testimonials && <TestimonialArea />}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="fff" />
      </BackButton>
    </Container>
  );
};

export default Barber;
