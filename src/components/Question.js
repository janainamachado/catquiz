import React from 'react';
import { Grid, Image, Link, Row, Text } from '@nextui-org/react';

function Question(props) {

  return (
    <Grid.Container justify="center">
      <Row justify="center">
        <Grid>
          <Text color="#ff4ecd">
          {props.currentQuestion}
          </Text>
        </Grid>
      </Row>

      <Row justify="center">
        <Grid>
          <Text css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
           }}> Select one of the cats</Text>
        </Grid>
      </Row>

      <Grid>  
        <Link onClick={props.vote}>
          <Image
          width={500}
          height={500}  
          src={props.randomCatFirst.url}/>
        </Link>

        <Link onClick={props.vote}>
          <Image 
          width={500}
          height={500}  
          src={props.randomCatSecond.url}/>
        </Link>
      </Grid>

    </Grid.Container>
  )
}

export default Question;