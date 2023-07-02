import {Link} from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import '../css/letras.css';
import imagen from '../media/us.jpg';

export default function Home(){
    return (<div>
        <Menu />
        <body>
            <div class="container">
                <h1 class="text-center mt-5 hover-effect">Cuadro de Mandos Configurable</h1>
                <p class="lead text-center hover-effect">Datos de Futbol Liga Española</p>
                <img src={imagen} alt="Universidad de Sevilla" style={{ display: 'block', margin: 'auto' }}/>
                
            </div>
        </body>

        <Footer />
    </div>
    );
}