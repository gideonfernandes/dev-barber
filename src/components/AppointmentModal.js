import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import Api from '../Api';

import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';

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

const DateInfo = styled.View`
  flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;

const DateTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #333;
`;

const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;

const DateList = styled.ScrollView`
  height: 100px;
`;

const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 8px 0;
  opacity: ${(props) => (props.available ? 1 : '0.3')};
  background-color: ${(props) => (props.selected ? 'salmon' : '#fff')};
`;

const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#fff' : '#555')};
`;

const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#fff' : '#555')};
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? 'salmon' : '#fff')};
`;

const TimeItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#fff' : '#555')};
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #333;
  height: 60px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const FinishButtonText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #fff;
`;

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const AppointmentModal = ({show, setShow, user, service}) => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  useEffect(() => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  useEffect(() => {
    if (user.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        let selDate = `${year}-${month}-${day}`;

        let availability = user.available.filter((e) => e.date === selDate);

        newListDays.push({
          status: availability.length > 0 ? true : false,
          weekDay: days[d.getDay()],
          number: i,
        });
      }

      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [user, selectedMonth, selectedYear]);

  useEffect(() => {
    if (user.available && selectedDay > 0) {
      let d = new Date(selectedYear, selectedMonth, selectedDay);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      let selDate = `${year}-${month}-${day}`;

      let availability = user.available.filter((e) => e.date === selDate);

      if (availability.length > 0) {
        setListHours(availability[0].hours);
      }
    }

    setSelectedHour(null);
  }, [user, selectedDay]);

  const navigation = useNavigation();

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleChangeMonth = (action) => {
    const mountDate = new Date(selectedYear, selectedMonth, 1);
    if (action === 'prev') {
      mountDate.setMonth(mountDate.getMonth() - 1);
    }

    if (action === 'next') {
      mountDate.setMonth(mountDate.getMonth() + 1);
    }

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  const handleFinishButton = async () => {
    if (
      user.id &&
      service !== null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour !== null
    ) {
      /*let response = await Api.setAppointment(
        user.id,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour,
      );

      if (response.error === '') {
        setShow(false);
        navigation.navigate('Appointments');
      } else {
        alert(`Error: ${response.error}`);
      }*/
      alert('Agendamento realizado com sucesso!');
      setShow(false);
      navigation.navigate('Home');
    } else {
      alert('Preencha todos os dados');
    }
  };

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

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={() => handleChangeMonth('prev')}>
                <NavPrevIcon width="35" height="35" fill="#333" />
              </DatePrevArea>

              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>

              <DateNextArea onPress={() => handleChangeMonth('next')}>
                <NavNextIcon width="35" height="35" fill="#333" />
              </DateNextArea>
            </DateInfo>

            {listDays.length > 0 && (
              <DateList
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listDays.map((day, key) => (
                  <DateItem
                    key={key}
                    available={day.status}
                    selected={selectedDay === day.number}
                    onPress={() =>
                      day.status ? setSelectedDay(day.number) : null
                    }>
                    <DateItemWeekDay selected={selectedDay === day.number}>
                      {day.weekDay}
                    </DateItemWeekDay>
                    <DateItemNumber selected={selectedDay === day.number}>
                      {day.number}
                    </DateItemNumber>
                  </DateItem>
                ))}
              </DateList>
            )}
          </ModalItem>

          {selectedDay > 0 && listHours.length > 0 && (
            <ModalItem>
              <TimeList horizontal showsHorizontalScrollIndicator={false}>
                {listHours.map((hour, index) => (
                  <TimeItem
                    key={index}
                    onPress={() => setSelectedHour(hour)}
                    selected={selectedHour === hour}>
                    <TimeItemText selected={selectedHour === hour}>
                      {hour}
                    </TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
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
