import React from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';

const AppHeader = () => (
  <Container>
    {/* Heads up! We apply there some custom styling, you usually will not need it. */}
    <style>{`
      html, body {
        background-color: #252839 !important;
      }
      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}</style>

    <Header as='h2' icon inverted textAlign='center'>
      <Icon name='space shuttle' />
      Star Wars Characters
      <Header.Subheader>
        This page contains some helpful examples that can be usefull for advanced layouts.
      </Header.Subheader>
    </Header>
    <Divider />
  </Container>
)

export default AppHeader;