import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';

const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: salmon;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;

const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #333;
  height: 60px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const FinishButtonText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #fff;
`;

const AppointmentModal = ({show, setShow, user, service}) => {
  const navigation = useNavigation();

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleFinishButton = () => {};

  return (
    <Modal transparent visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseModal}>
            <ExpandIcon width="40" height="40" fill="#333" />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>

          {service !== null && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{user.services[service].name}</ServiceName>
                <ServicePrice>
                  R$ {user.services[service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}

          <FinishButton onPress={handleFinishButton}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};

export default AppointmentModal;
