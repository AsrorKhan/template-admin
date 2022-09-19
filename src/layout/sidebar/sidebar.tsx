import React from 'react';import './sidebar.scss';import { menuLinks } from '../../routes/menuLinks';import { NavLink, useNavigate } from 'react-router-dom';import { Button, List } from '@mui/material';import { ICONS_LIST } from '../../assets/icons/icons';import LogoutIcon from '@mui/icons-material/Logout';export const SidebarComponent: React.FC<{}> = props => {    const [open, setOpen] = React.useState(true);    // const [selectedLink, setSelectedLink] = useState(false);    const navigate = useNavigate();    const handleClick = () => {        setOpen(!open);    };    const logout = () => {        localStorage.removeItem('login_data');        navigate('/login');    };    return (        <div className="sidebar">            <div>                <div className="sidebar-logo">                    <img src={ICONS_LIST.appLogo} alt="" />                </div>                <hr />                <div className="sidebar-routes">                    <List className="sidebar__menu-list">                        {menuLinks?.map(item => (                            <NavLink                                key={item.link}                                to={item.link}                                className={({ isActive }) =>                                    isActive ? 'active-link' : 'inActive-link'                                }                            >                                {item.icon}                                {item.label}                            </NavLink>                        ))}                    </List>                </div>                <hr />            </div>            <div className="sidebar__logout">                <Button                    variant={'contained'}                    color={'success'}                    onClick={() => logout()}                >                    Log out &nbsp; <LogoutIcon />                </Button>            </div>        </div>    );};