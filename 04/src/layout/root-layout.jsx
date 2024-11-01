import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import Sidebar from '../components/sidebar.jsx';
import styled from 'styled-components';

const RootLayout = () => {
    return (
        <Container>
            <StyledNavbar />
            <Main>
                <StyledSidebar />
                <Content>
                    <Outlet />
                </Content>
            </Main>
        </Container>
    );
};

export default RootLayout;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

const Main = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const StyledNavbar = styled(Navbar)`
    background-color: #111;
    color: white;
    padding: 10px;
    height: 50px;
    width: 100%;
`;

const StyledSidebar = styled(Sidebar)`
    width: 200px;
    background-color: #222;
    color: white;
    padding: 20px;
    height: calc(100vh - 50px);
    position: fixed;
    top: 50px;
    left: 0;
    box-sizing: border-box;
`;

const Content = styled.div`
    padding: 20px;
    background-color: #141414;
    flex-grow: 1;
    height: calc(100vh - 50px);
    overflow-y: auto;
    box-sizing: border-box;
`;
