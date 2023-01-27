import * as xlsx from 'xlsx'
import { useEffect, useState } from 'react'
import style from './Table.module.scss'

export default function Table() {
    const [sheetNames, setSheetNames] = useState<string[]>([])
    const [sheets, setSheets] = useState<{ [sheet: string]: xlsx.WorkSheet }>({})
    const [baseData, setBaseData] = useState<any[]>([])
    const [selectedCol, setSelectedCol] = useState<string>(" ")
    const [selectedSheet, setSelectedSheet] = useState<string>("")

    const [data, setData] = useState<any[]>([])
    const [heads, setHeads] = useState<string[]>([])

    const handleDropAsync = async (e: any) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const wb = xlsx.read(data);
        setSheetNames(wb.SheetNames);
        setSheets(wb.Sheets);
    }

    useEffect(() => {
        console.log(selectedCol);
    }, [selectedCol])

    const onSheetChange = async (sheetName: string) => {
        const sheet = xlsx.utils.sheet_to_json<any[]>(sheets[sheetName]);
        setHeads(Object.keys(sheet[0]));
        setBaseData(sheet);
        setData(sheet);
        setSelectedSheet(sheetName);
    }

    const onSortBy = async (colName: string) => {
        const temp = [...data];
        temp.sort((a, b) => (a[colName] > b[colName]) ? 1 : -1);
        setData(temp);
        setSelectedCol(colName);
    }

    const onFilter = async (target: string) => {
        let temp = [...baseData];
        temp = temp.filter((a: any) => a[selectedCol] && a[selectedCol].toString().toLowerCase().includes(target.toLowerCase()));
        setData(temp);
    }

    return (
        <div className={style.table}>
            <div className={style.tab}>
                {sheetNames.map((name: string) => <button className={selectedSheet === name ? style.selectedSheet : ""} key={name} onClick={() => onSheetChange(name)}>{name}</button>)}
                <input className={style.file} type="file" id="inf" multiple={false} onChange={handleDropAsync} />
                <label className={sheetNames.length === 0 ? style.centeredFile : ""}htmlFor="inf">Choose an excel file</label>
            </div>
            {baseData.length > 0 && <input className={style.search} type="text" placeholder="search here" onChange={(e) => onFilter(e.target.value)} />}
            {data.length > 0 &&
                <div className={style.cont}>
                    <table>
                        <thead>
                            <tr key="header">
                                {
                                    heads.map(key => (<th key={key} className={selectedCol === key ? style.selectedCol : ""} onClick={() => onSortBy(key)}>{key}</th>))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((man: any) => (
                                    <tr key={man[0]}>
                                        {
                                            heads.map(key => (
                                                <td key={man[0] + key}>{man[key]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={heads.length}>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>}
        </div>
    );
}
