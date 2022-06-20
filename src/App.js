import React, { useEffect, useState } from 'react';
import { Button, Grid, Row, Text } from '@nextui-org/react';
import Question from './components/Question';

const catApiKey = process.env.REACT_APP_CAT_API_KEY

function App() {

  const emptyRandomCat = { url: undefined }
  const [randomCatFirst, setRandomCatFirst] = useState(emptyRandomCat)
  const [randomCatSecond, setRandomCatSecond] = useState(emptyRandomCat)
  const [voteCounter, setVoteCounter] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentResult, setCurrentResult] = useState('')
  const requiredAnswersNumber = 3;

  useEffect(() => {
    if(voteCounter >= requiredAnswersNumber) {
      const randomResultIndex = Math.floor(Math.random() * results.length); 
      setCurrentResult(results[randomResultIndex])
    }
  }, [voteCounter])
  
  const getRandomCats = async () => {
    const randomCat = await fetch('https://api.thecatapi.com/v1/images/search', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': catApiKey 
      }
    })
    .then((response) => response.json())
    
    return randomCat[0]
  }

  const renderRandomQuestion = async () => {
    setRandomCatFirst(await getRandomCats())
    setRandomCatSecond(await getRandomCats())
    
    const randomQuestionIndex = Math.floor(Math.random() * questions.length); 
    setCurrentQuestion(questions[randomQuestionIndex])
  }

  const vote = () => {
    setVoteCounter(voteCounter+1)
    renderRandomQuestion()
  }
  
  const questions = [
    "Which cat is you animal spirit?",
    "Which cat defines your humour right now?",
    "Which cat is your favorite?"
  ]

  const results = [
    "Congrats, you're a lazy cat!",
    "You enjoy life just like Garfield!", 
  ]

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Row justify="center">
          <Grid>
            <Text color="#ff4ecd">Click on the button to start</Text>
            <Button color="gradient" onClick={renderRandomQuestion}>What type of cat am I?</Button>
          </Grid>
        </Row>
      </Grid.Container>
      
      {voteCounter < requiredAnswersNumber && randomCatFirst.url !== undefined &&
        <Question 
          randomCatFirst={randomCatFirst}
          randomCatSecond={randomCatSecond}
          currentQuestion={currentQuestion}
          vote={vote}
        />
      }
      {voteCounter >= requiredAnswersNumber &&
        <Text
          h2 
          css={{
            textAlign: "center",
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
          }}
          weight="bold"
        >
          {currentResult}
        </Text>
      }


    </>
  );
}

export default App;
