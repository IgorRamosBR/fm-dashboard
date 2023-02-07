import React, { useEffect } from 'react';
import { BankOutlined, HomeOutlined, TableOutlined, CheckOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Typography } from 'antd';
import './home.css'
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Budget from '../budget/budget';
import Category from '../category/category';
import LoginButton from '../../components/login/login';
import { useAuth0 } from '@auth0/auth0-react';
import { Callback } from '../../components/callback/callback';
import { Auth } from '../../components/auth/auth';
const { Text } = Typography;

const { Header, Content, Sider } = Layout;
const menu = [
    { name: <Link to="/">Início</Link>, icon: HomeOutlined },
    { name: <Link to="/budget">Controle familiar</Link>, icon: TableOutlined },
    { name: <Link to="/categories">Categorias</Link>, icon: TableOutlined },
    { name: "Investimentos", icon: BankOutlined },
    { name: "Metas", icon: CheckOutlined },
]

const routes = [
    {
        path: "/",
        exact: true,
        main: () => <Budget />
    },
    {
        path: "/budget",
        exact: true,
        main: () => <Budget />
    },
    {
        path: "/categories",
        exact: true,
        main: () => <Category />
    },
    {
        path: "/callback",
        exact: true,
        main: () => <Callback />
    }
];

const Home: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <Router>
            <Layout>
                {isAuthenticated && <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo">
                        <span style={{ color: 'white' }}>
                            Olá, {user?.name}
                        </span>

                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={menu.map(
                            (item, index) => ({
                                key: String(index + 1),
                                icon: React.createElement(item.icon),
                                label: item.name,
                            }),
                        )}
                    />
                </Sider>
                }
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <span style={{ paddingLeft: 40, fontSize: '24px' }}>Finance manager</span>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', height: '800px' }}>
                        {!isAuthenticated ?
                            <>
                                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                    <Text strong>Faça o login antes de utilizar esse site.</Text>

                                </div>
                                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                    <LoginButton />
                                </div>
                            </> :
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))}
                            </Switch>
                        }
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};


const HomeContent: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                <Row gutter={[16, 24]}>
                    <Col sm={12} md={8}>
                        <Card bordered={false} style={{ textAlign: 'center', backgroundColor: '#111d2c', height: '200px', width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ color: colorBgContainer, fontSize: '24px', textAlign: 'center' }}>Controle de orçamento familiar</span>
                        </Card>
                    </Col>
                    <Col sm={12} md={8}>
                        <Card bordered={false} style={{ textAlign: 'center', backgroundColor: '#111d2c', height: '200px', width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ color: colorBgContainer, fontSize: '24px', textAlign: 'center' }}>Investimentos</span>
                        </Card>
                    </Col>
                    <Col sm={12} md={8}>
                        <Card bordered={false} style={{ textAlign: 'center', backgroundColor: '#111d2c', height: '200px', width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ color: colorBgContainer, fontSize: '24px', textAlign: 'center' }}>Metas</span>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home;