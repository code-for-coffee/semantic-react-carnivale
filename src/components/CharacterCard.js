import React from 'react';
import { Card } from 'semantic-ui-react';

const CharacterCard = ({ props }) => (
  <React.Fragment>
    <Card className='card'>
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>
        <span className='date'>Born {props.birth_year}</span>
      </Card.Meta>
      <Card.Description>Vitals: {props.gender}, {props.eye_color} eyes, {props.skin_color} skin tone, {props.hair_color} hair color. Mass of {props.mass} and height of {props.height}.</Card.Description>
    </Card.Content>
  </Card>
  </React.Fragment>
)

export default CharacterCard;