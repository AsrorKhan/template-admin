import React, { useState } from 'react';import './login.scss';import { Button, Checkbox, Form, Input } from 'antd';import { ICONS_LIST } from '../../assets/icons/icons';import authService from '../../services/authService';import { ACCOUNT_ROLES, IUserData } from '../../models/user';import { useNavigate } from 'react-router-dom';import { useAppDispatch } from '../../hook/useDispatch';import { setUsers } from '../../store/reducer/userReducer';import jwtDecode from 'jwt-decode';export const Login: React.FC<{}> = props => {    const [userLogin, setUserLogin] = useState('');    const [userPassword, setUserPassword] = useState('');    const dispatch = useAppDispatch();    const navigate = useNavigate();    const setLogin = (        event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>    ) => {        let value = event.currentTarget.value;        if (value.length !== 0) {            setUserLogin(value);        }    };    const setPassword = (        event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>    ): void => {        let value = event.currentTarget.value;        if (value.length !== 0) {            setUserPassword(value);        }    };    const onFinish  = () => {        try {            let userData: IUserData = {                username: userLogin,                password: userPassword,            };            authService                .getAuthToken(userData)                .then(res => {                    const data = res.data;                    if (res.data) {                        dispatch(                            setUsers({                                ...res.data,                                isAuth: true,                            })                        );                        localStorage.setItem(                            'login_data',                            JSON.stringify(data)                        );                        localStorage.setItem('token', res?.data?.id_token);                        const decodedToken = jwtDecode(res?.data?.id_token);                        console.log('decodedToken', decodedToken);                        // @ts-ignore                        if (decodedToken?.auth.includes(ACCOUNT_ROLES.ADMIN)) {                            navigate('/');                        } else {                            navigate('/analysis');                        }                    }                })                .catch(err => {                    console.log(err);                    alert(err.message);                })        } catch (err) {            console.log('getAuthToken', err);            alert(err);        }    };    const onFinishFailed = (errorInfo: any) => {        console.log('Failed:', errorInfo);    };    const validateMessages = {        required: "'${name}' is required!",        // ...    };    return (        <div className="login-page">            <div className="login-page__content">                <div className="app-logo-content">                    <img src={ICONS_LIST.mainLogo} alt="main-logo" />                    &nbsp;InPay                </div>                <Form                    name="basic"                    labelCol={{ span: 8 }}                    wrapperCol={{ span: 16 }}                    initialValues={{ remember: true }}                    onFinish={onFinish}                    onFinishFailed={onFinishFailed}                    autoComplete="off"                    validateMessages={validateMessages}                >                    <Form.Item                        label="Username"                        name="username"                        rules={[{ required: true, message: 'Please input your username!' }]}                    >                        <Input                            onChange={event => setLogin(event)}                            type="text"                            className="login-page__content__form__login"                            value={userLogin}                        />                    </Form.Item>                    <Form.Item                        label="Password"                        name="password"                        rules={[{ required: true, message: 'Please input your password!' }]}                    >                        <Input.Password                            type="password"                            className="login-page__content__form__password"                            value={userPassword}                            onChange={event => setPassword(event)}                        />                    </Form.Item>                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>                        <Checkbox>Remember me</Checkbox>                    </Form.Item>                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>                        <Button type="primary" htmlType="submit">                            Submit                        </Button>                    </Form.Item>                </Form>            </div>        </div>    );};