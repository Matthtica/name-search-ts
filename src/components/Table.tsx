import * as xlsx from 'xlsx'
import { useState } from 'react'

export default function Table() {
    const [data, setData] = useState<any[]>([])
    const [heads, setHeads] = useState<string[]>([])

    const handleDropAsync = async (e: any) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const wb = xlsx.read(data);
        const sheet = xlsx.utils.sheet_to_json<any[]>(wb.Sheets.Sheet1);
        setHeads(Object.keys(sheet[0]));
        setData(sheet);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            heads.map(key => (<th>{key}</th>))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((man: any) => (
                            <tr key={man[heads[0]]}>
                                {
                                    heads.map(key => (
                                        <td key={key}>{man[key]}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={heads.length}>
                            <input type="file" id="inf" multiple={false} onChange={handleDropAsync} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
