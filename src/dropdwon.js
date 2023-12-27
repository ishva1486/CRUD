import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Select } from 'antd';

const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());;

function Sorting1() {
    const [inputData, setInputData] = useState({
        fname: '',
        sname: '',
        cname: '',
        email: ''
    })
    console.log(inputData);

    const handleOnChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }

    const [records, setRecords] = useState(JSON.parse(localStorage.getItem('data')) || [])

    const handleSubmit = () => {
        setRecords([...records, inputData])
        localStorage.setItem("data", JSON.stringify([...records, inputData]))
    }

    //......Dropdwon sorting......//
    const [sort, setSort] = useState("");
    const getData = useMemo(() => {
        if (sort === "fname") {
            return records.sort((a, b) => a["fname"].localeCompare(b["fname"]));
        }

        else if (sort === "sname") {
            return records.sort((a, b) => a["sname"].localeCompare(b["sname"]));
        }

        else if (sort === "cname") {
            return records.sort((a, b) => a["cname"].localeCompare(b["cname"]));
        }

        else if (sort === "email") {
            return records.sort((a, b) => a["email"].localeCompare(b["email"]));
        }

        else {
            return records;
        }
    }, [sort, records])
    //.............over............//


    //......Dropdwon searching......//
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState("")

    const searchData = useMemo(() => {
        if (selected === 'fname') {
            return records.filter((item) => item.fname.toLowerCase().includes(search.toLowerCase()))
        }

        if (selected === 'sname') {
            return records.filter((item) => item.sname.toLowerCase().includes(search.toLowerCase()))
        }

        if (selected === 'cname') {
            return records.filter((item) => item.cname.toLowerCase().includes(search.toLowerCase()))
        }

        if (selected === 'email') {
            return records.filter((item) => item.email.toLowerCase().includes(search.toLowerCase()))
        }

        else {
            return records;
        }
    }, [records, selected])
    console.log(searchData)
    //...........over...........//

    return (
        <>
            <h3 style={{ margin: '20px' }}>Dropdown Sorting</h3>

            <form style={{ fontSize: 'larger', margin: '20px' }}>
                <div style={{ marginTop: '20px' }}>
                    <label for='fname'>Firstname</label>
                    <input type="text" name="fname" value={inputData.fname} onChange={(e) => handleOnChange(e)} />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label for="sname">Surname</label>
                    <input type="text" name="sname" value={inputData.sname} onChange={(e) => handleOnChange(e)} />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label for="cname">Compny name</label>
                    <input type="text" name="cname" value={inputData.cname} onChange={(e) => handleOnChange(e)} />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label for="email">Compny name</label>
                    <input type="email" name="email" value={inputData.email} onChange={(e) => handleOnChange(e)} />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="search here" />
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                            {
                                value: 'jack',
                                label: <button onClick={(e) => setSelected(e.target.innerText)}>fname</button>,
                            },

                            {
                                value: 'lucy',
                                label: <button onClick={(e) => setSelected(e.target.innerText)}>sname</button>,
                            },

                            {
                                value: 'jhon',
                                label: <button onClick={(e) => setSelected(e.target.innerText)}>cname</button>,
                            },

                            {
                                value: 'lucy',
                                label: <button onClick={(e) => setSelected(e.target.innerText)}>email</button>,
                            },
                        ]}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button type="button" onClick={() => handleSubmit()}>submit</button>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <select onChange={(e) => setSort(e.target.value)}>
                        <option value="fname">Firstname</option>
                        <option value="sname">Surname</option>
                        <option value="cname">Compny name</option>
                        <option value="email">Email</option>
                    </select>
                </div>
            </form>

            <div style={{ fontSize: 'larger', margin: '20px' }}>
                <table className="table table-striped table-hover table-border">
                    <thead>
                        <th>Firstname</th>
                        <th>Surname</th>
                        <th>Compnyname</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {
                            searchData?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.fname}</td>
                                        <td>{item.sname}</td>
                                        <td>{item.cname}</td>
                                        <td>{item.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Sorting1;