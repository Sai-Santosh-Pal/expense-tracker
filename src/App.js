import styled from "styled-components"
import HomeComponent from "./modules/home";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: Geist;
`;

const Header = styled.span`
  color: white;
  font-size: 35px;
  font-weight: bold;
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
