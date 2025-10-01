import styled from "styled-components"
import HomeComponent from "./modules/home";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  font-family: Geist;
  background: #fff;
  color: #000;
  letter-spacing: -0.5px;
  overflow-x: hidden;
`;

const Header = styled.span`
  color: #000;
  font-size: 35px;
  font-weight: bold;
  letter-spacing: -0.8px;
  margin-top: 30px
`;

function App() {
  return ( 
  <Container>
    <Header>Expense Tracker</Header>
    <HomeComponent />
  </Container>

  );
}

export default App;
