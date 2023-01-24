import * as xlsx from 'xlsx'
import { useState } from 'react'
import style from './Table.module.scss'

export default function Table() {
    const [data, setData] = useState<any[]>([])
    const [heads, setHeads] = useState<string[]>([])
    const [sheetNames, setSheetNames] = useState<string[]>([])
    const [sheets, setSheets] = useState<{[sheet: string]: xlsx.WorkSheet}>({})

    const handleDropAsync = async (e: any) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const wb = xlsx.read(data);
        setSheetNames(wb.SheetNames);
        setSheets(wb.Sheets);

        onSheetChange(sheetNames[0]);
    }

    const onSheetChange = (sheetName: string) => {
        const sheet = xlsx.utils.sheet_to_json<any[]>(sheets[sheetName]);
        setHeads(Object.keys(sheet[0]));
        setData(sheet);
        console.log(sheet)
    }

    const onSortBy = (colName: string) => {
        const temp = [...data];
        temp.sort((a, b) => (a[colName] > b[colName]) ? 1 : -1);
        setData(temp);
    }

    return (
        <div className={style.table}>
            <div className={style.tab}>
                {sheetNames.map((name: string) => <button key={name} onClick={() => {onSheetChange(name)}}>{name}</button>)}
            </div>
            <table>
            <thead>
                    <tr>
                        {
                            heads.map(key => (<th key={key} onClick={() => onSortBy(key)}>{key}</th>))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((man: any) => (
                            <tr key={man[heads[0]]}>
                                {
                                    heads.map(key => (
                                        <td key={man[key]}>{man[key]}</td>
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
