import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  FormArea,
  CustomButton,
  CustomButtonText,
  SignMessage,
  SignMessageText,
  SignMessageTextBold,
} from './styles';

import BarberLogo from '../../assets/barber.svg';
import InputField from '../../components/InputField';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

const SignUp = () => {
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const navigation = useNavigation();

  const handleSignPress = () => {};

  const handleSignMessagePress = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <FormArea>
        <InputField
          IconSvg={PersonIcon}
          placeholder="Digite seu nome completo"
          value={nameField}
          onChangeText={(text) => setNameField(text)}
        />
        <InputField
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={(text) => setEmailField(text)}
        />
        <InputField
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(text) => setPasswordField(text)}
          password
        />

        <CustomButton onPress={handleSignPress}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </FormArea>

      <SignMessage onPress={handleSignMessagePress}>
        <SignMessageText>Já possui uma conta?</SignMessageText>
        <SignMessageTextBold>Faça Login</SignMessageTextBold>
      </SignMessage>
    </Container>
  );
};

export default SignUp;
