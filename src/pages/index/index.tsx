import { Button, Input, View, Text } from "@tarojs/components";
import Vika from '@vikadata/vika';
import React, { useState } from "react";
import mpAdapter from 'axios-miniprogram-adapter';
import './index.css';


const Index = () => {
  const [token, setToken] = useState<string>();
  const [datasheetId, setDatasheetId] = useState<string>();
  const [records, setRecords] = useState<any[]>([]);

  const fetchVikaDatasheetRecords = async () => {
    if (token && datasheetId) {
      const vika = new Vika({ token, adapter: mpAdapter })
      const resp = await vika.datasheet(datasheetId).records.query();
      if (resp.data?.records) {
        setRecords(resp.data.records);
        console.log(resp.data.records)
      }
    }
  }

  return (
    <View className='wrapper'>
      <Input
        placeholder='API Token'
        value={token} onInput={(e) => {
          setToken(e.detail.value)
        }}
      />
      <Input
        placeholder='维格表ID'
        value={datasheetId} onInput={(e) => {
          setDatasheetId(e.detail.value)
        }}
      />
      <Button className='button' onClick={fetchVikaDatasheetRecords}>
        获取记录
      </Button>
      {
        records.map(record => {
          return <Text key={record.recordId} >
            {record.recordId}
          </Text>
        })
      }
    </View>
  );
};

export default Index;
