import './App.css';

/**
 * Component
 * 1. 컴포넌트는 html의 확장성을 높여준다
 * 2. 컴포넌트의 적절한 분리는 확장성 뿐만이 아닌 코드의 가시성을 높여준다
 * 3. 컴포넌트의 첫글자는 대문자를 철칙으로 한다
 */

function Header(){
  return <header>
  <h1><a href="/">React</a></h1>
  </header>
}

function Nav(){
  return <nav>
    <ol>
      <li><a href='/read/1'>html</a></li>
      <li><a href='/read/2'>css</a></li>
      <li><a href='/read/3'>js</a></li>
    </ol>
  </nav>
}

function Article(){
  return <article>
    <h2> Welcome </h2>
    Hello, Web
  </article>
}

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;
