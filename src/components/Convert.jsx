import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Form, Input, Select } from "antd";
import { RiCoinsLine } from 'react-icons/ri';
const Convert = () => {

    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
    
    const [list,setList] = useState('');
    const [fValue,setfValue]=useState('Bitcoin')
    const [sValue,setsValue]=useState('Ether')
    const [input,setInput] = useState('')
    const [result,setResult]=useState('0')
    const fetchData=async()=>{
        const data = await axios.get(apiUrl);
        const t=Object.entries(data.data.rates);
        const newData = t.map((data)=>{
            return {
                value:data[1].name,
                label:data[1].name,
                rate:data[1].value
            }
        })
        setList(newData)
    }
    useEffect(()=>{
        fetchData()
    },[])
    
    useEffect(()=>{
        if(list.length==0) return;
        const firstSelectRate = list.find((item)=>{
            return item.value === fValue
        }).rate;
        const secondSelectRate = list.find((item)=>{
            return item.value === sValue
        }).rate;

        const res = (input*secondSelectRate/firstSelectRate);
        setResult(res.toFixed(5))

    },[input,fValue,sValue])

  return (
    <div className="container">
    <Card className="crypto-card" title={<h1> <RiCoinsLine /> Crypto Converter</h1>}>
        <Form size="large">
            <Form.Item>
                <Input onChange={(e)=>{setInput(e.target.value)}} />
            </Form.Item>
        </Form>
        <div className="select-box">
            <Select
            style={{ width: "200px" }}
            options={list}
            defaultValue={fValue}
                onChange={(e)=>{setfValue(e)}}
            />
            <Select
                style={{ width: "200px" }}
                options={list}
                defaultValue={sValue}
                onChange={(e)=>{setsValue(e)}}
            />
        </div>
        <p>{input} {fValue} = {result} {sValue}</p>
    </Card>
</div>
  )
}   

export default Convert;