import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { Container } from "react-bootstrap";
import EventBus from "../modules/EventBus";

EventBus.subscribe(
    "print",
    (message: any) => console.log(message)
)

const App = ({ Component, pageProps }: AppProps) =>
    <Container>
      <Component {...pageProps} />
    </Container>

export default App
