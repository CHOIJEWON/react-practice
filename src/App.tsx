import './App.css';

/**
 * props
 * props는 html에 parameters를 사용할수 있게 하는 요소이다
 */

interface Topics {
  id: number;
  title: string;
  href: string;
}

function Header(props:{ title?: string}){
  console.log("🚀 ~ file: App.tsx:8 ~ Header ~ props:", props)
  // 🚀 ~ file: App.tsx:8 ~ Header ~ props: { title: "React"}
  return <header>
  <h1><a href="/">{props.title}</a></h1> 
  </header>
}

function Nav(props: { topics: Topics[]}){
  console.log("🚀 ~ file: App.tsx:24 ~ Nav ~ props:", props)
  // topics: Array(3)
  // 0: {id: 1, title: 'html', href: '/read/1'}
  // 1: {id: 2, title: 'css', href: '/read/2'}
  // 2: {id: 3, title: 'js', href: '/read/3'}

  const formToHtml = props.topics.map((topic) => <li><a href={topic.href}>{topic.title}</a></li>)

  return <nav>
    <ol>
      {formToHtml}
    </ol>
  </nav>
}

function Article(props: {title?: string, body: string}){
  console.log("🚀 ~ file: App.tsx:28 ~ Article ~ props:", props)
  // 🚀 ~ file: App.tsx:28 ~ Article ~ props: { title: "Welcome", body: "Hello, World"}
  return <article>
    <h2> {props.title} </h2>
    {props.body}
  </article>
}

function App() {
  const topics = [
    {
      id: 1,
      title: 'html',
      href: "/read/1"
    },
    {
      id: 2,
      title: 'css',
      href: "/read/2"
    },
    {
      id: 3,
      title: 'js',
      href: "/read/3"
    }
  ]

  return (
    <div className="App">
      <Header title="React"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, World"></Article>
    </div>
  );
}

export default App;
