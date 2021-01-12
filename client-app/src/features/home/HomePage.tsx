import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../../features/user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore
    const {openModal } = rootStore.modalStore;
    return (
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image
              size="massive"
              src="/assets/logo.png"
              alt="logo"
              style={{ marginBottom: 12 }}
            />
            Reactivities
          </Header>
          <Header as="h2" inverted content="Welcome to Reactivities" />
          {isLoggedIn && user ? (
            <Container style={{ marginTop: "7em" }}>
              <h1>Welcome {user.displayName}</h1>
              <h3>
                Go to <Link to="/activities">Activities</Link>
              </h3>
            </Container>
          ) : (
            <Container style={{ marginTop: "7em" }}>
              <h1>Home Page</h1>
              <h3>
                <Button onClick={() => openModal(<LoginForm />)}>Login</Button>
              </h3>
              <h3>
                <Button onClick={() => openModal(<RegisterForm />)}>
                  Register
                </Button>
              </h3>
            </Container>
          )}
        </Container>
      </Segment>
    );
};

export default observer(HomePage);
