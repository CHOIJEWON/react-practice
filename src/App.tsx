import { useState } from 'react';
import './App.css';

interface Topics {
  id: number;
  title: string;
  href: string;
}

/**
 * onChangeMode는 header라는 문구를 갖은 alert을 띄우는 함수이다
 * click이 일어난 경우 preventDefault()를 사용해서 reload를 방지한다
 */
function Header(props:{ title?: string, onChangeMode: Function}){
  return <header>
  <h1><a href="/" onClick={(event) => {
    event.preventDefault();
    props.onChangeMode()
  }}>{props.title}</a></h1> 
  </header>
}

function Nav(props: { topics: Topics[], onChangeMode: Function}){
  const formToHtml = props.topics.map((topic) => <li><a id={String(topic.id)} href={topic.href} onClick={event => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement
    props.onChangeMode(target.id);
  }}>{topic.title}</a></li>)
  return <nav>
    <ol>
      {formToHtml}
    </ol>
  </nav>
}

function Article(props: {title?: string, body: string}){
  return <article>
    <h2> {props.title} </h2>
    {props.body}
  </article>
}

function App() {
  const [id, setId] = useState<null | number>(null);
  const [mode, setMode] = useState<string>("WELCOME");
  // console.log("🚀 ~ file: App.tsx:45 ~ App ~ mode:", mode) // state의 value를 확인할때 사용함
  // console.log("🚀 ~ file: App.tsx:45 ~ App ~ setMode:", setMode) // value를 조작할때 사용함
  
  let content: JSX.Element | null = null;

  const topics = [
    {
      id: 1,
      title: 'html',
      body: 'html is...',
      href: "/read/1"
    },
    {
      id: 2,
      title: 'css',
      body: 'css is...',
      href: "/read/2"
    },
    {
      id: 3,
      title: 'js',
      body: 'js is...',
      href: "/read/3"
    }
  ];

  if (mode === "WELCOME") content = <Article title="Welcome" body="Hello, Web" />;
  else if (mode === "READ") {
    const topic = topics.find(t => t.id === Number(id))    
    return content = <Article title={topic!.title} body={topic!.body}></Article>
  }
  
  return (
    <div className="App">
      <Header title="React" onChangeMode={() => {
        setMode("WELCOME");
      }} />
      <Nav topics={topics} onChangeMode={(id: number) => {
        setMode("READ")
        setId(id);
      }} />
      {content}
    </div>
  );
}

export default App;
