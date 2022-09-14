import { useCallback, useEffect, useState } from 'react';
import { read, utils, writeFile } from 'xlsx';
import './App.css';

interface President {
    Name: string;
    Index: number;
}

function App() {
    const [pres, setPres] = useState<President[]>();

    useEffect(() => {
        (async () => {
            const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
            const wb = read(f);
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = utils.sheet_to_json(ws);
            setPres(data as President[]);
        })();
    }, []);

    return (
        <div className="App">
            <table>
                <thead>
                    <th>Name</th>
                    <th>Index</th>
                </thead>
                <tbody>
                    {
                        pres?.map(p => (<tr>
                            <td>{p.Name}</td>
                            <td>{p.Index}</td>
                        </tr>))
                    }
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
    );
}

export default App;
