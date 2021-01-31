import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json'
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import { TooltipCard, TooltipBox, TooltipText } from '../src/components/Tooltip';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [ name, setName ] = React.useState( '' );

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          AluraQuiz -
          {db.title}
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Who's challenging this Math Quizz?"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                { `Ready Player ${ name }` }
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Or play some other awesome quizzes!</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={ linkExterno }>
                    <ExternalQuizLink
                      projectName={ projectName }
                      githubUser={ githubUser }
                      name={ name }
                    />
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Noriller/aluraquiz-base" />
    </QuizBackground>
  );
}
function ExternalQuizLink ( { projectName, githubUser, name } ) {
  const [ isHovering, setIsHovering ] = React.useState( false );
  const shouldShowTopic = ( isHovering && name ) || !isHovering;

  function handleMouse () {
    setIsHovering( !isHovering );
  }

  return (
    <div
      onMouseEnter={ handleMouse }
      onMouseLeave={ handleMouse }
    >
      <Widget.Topic
        as={ Link }
        href={ `/quiz/${ projectName }___${ githubUser }?name=${ name }` }
        style={ shouldShowTopic ? null : { display: 'none' } }
      >
        { `${ githubUser }/${ projectName }` }
      </Widget.Topic>
      <Widget.Topic style={ !shouldShowTopic ? null : { display: 'none' } }>
        Can you give me your name?
      </Widget.Topic>
    </div>
  );
}

