import style from './App.module.scss';
import Table from './components/Table';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { auth } from './firebase';

function App() {

    const [user] = useAuthState(auth)

    return (
        <div className={style.cont}>
            <div className={style.box}>
                <Table />
                <SignIn/>
            </div>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result: UserCredential) => {
                console.log(result.user);
            }).catch((error) => {
                console.log("What the fuck just happened?")
                console.log(error);
            });
    }
    return <button className={style.signin} onClick={signInWithGoogle}>Do not press this button!!!</button>
}

export default App;
