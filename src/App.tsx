import { useState } from 'react';
import './App.css';

interface Topics {
  id: number;
  title: string;
  body: string
}

interface FormValues {
  title: string;
  body: string;
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
  const formToHtml = props.topics.map((topic) => <li><a id={String(topic.id)} onClick={event => {
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

function Create(props: { onCreate: Function}){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const {title, body}: FormValues = {
        title: formData.get('title') as string,
        body: formData.get('body') as string,
      };
    
      console.log(title, body)
      props.onCreate(title, body)
    }}>
      <p><input type='text' name='title' placeholder='아이디를'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value="Create"></input></p>
    </form>
  </article>
}

function App() {
  const [id, setId] = useState<null | number>(null);
  const [mode, setMode] = useState<string>("WELCOME");
  const [nextId, setNextId] = useState(4)
  // console.log("🚀 ~ file: App.tsx:45 ~ App ~ mode:", mode) // state의 value를 확인할때 사용함
  // console.log("🚀 ~ file: App.tsx:45 ~ App ~ setMode:", setMode) // value를 조작할때 사용함
  
  let content: JSX.Element | null = null;

  const [topics, setTopics] = useState([
    {
      id: 1,
      title: 'html',
      body: 'html is...',
    },
    {
      id: 2,
      title: 'css',
      body: 'css is...',
    },
    {
      id: 3,
      title: 'js',
      body: 'js is...',
    }
  ]);
  if (mode === "WELCOME") content = <Article title="Welcome" body="Hello, Web" />;
  else if (mode === "READ") {
    const topic = topics.find(t => t.id === Number(id))    
    return content = <Article title={topic!.title} body={topic!.body}></Article>
  }
  else if (mode ==="CREATE") {
    content = <Create onCreate={(title: string,body: string) => {
      const newTopic = {id: nextId, title, body,}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode("READ")
      setId(nextId)
      setNextId(nextId+1)
    }}></Create>
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
      <a href='/create' onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}

export default App;
