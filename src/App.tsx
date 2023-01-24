import style from './App.module.scss';
import Table from './components/Table';

function App() {
    return (
        <div className={style.cont}>
            <div className={style.box}>
                <Table/>
            </div>
        </div>
    );
}

export default App;
