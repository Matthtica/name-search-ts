import style from './App.module.scss';
import Table from './components/Table';
import firebaseui from 'firebaseui';

function App() {

    const ui = new firebaseui.auth.AuthUI(fire)

    return (
        <div className={style.cont}>
            <div className={style.box}>
                <Table />
            </div>
        </div>
    );
}

export default App;
