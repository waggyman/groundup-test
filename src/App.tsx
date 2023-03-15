import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dropdown from './components/Dropdown';
import BackIcon from './assets/icons/arrow-left.svg';
import NotifBadge from './components/NotifBadge';
import Card from './components/Card';
import WaveFormDetail from './components/WaveFormDetail';
import axios from 'axios';

type DataDetail = {
  objectId: string,
  id: string,
  date: string,
  machineName: string,
  suspectedReason: string,
  sourceAudio: string
}

function App() {
  const testSelect = (value: string) => {
    console.log("DO SOMETHING HERE")
  }

  const [anomalies, setAnomalies] = useState([]);
  const fetchAnomalies = async () => {
    const response = await axios.get('https://groundup-test-api.vercel.app/anomalies')
    setAnomalies(response.data)
  }

  useEffect(() => {
    fetchAnomalies()
  }, [])

  const [selectedData, setSelectedData] = useState<DataDetail|undefined>()

  const convertUnixToTime = (unixTime: number) => {
    let convertDate = new Date(unixTime * 1000)
    const timeZone = convertDate.getTimezoneOffset()*60*1000
    convertDate = new Date(convertDate.getTime() - (timeZone))
    const splitedDate = convertDate.toISOString().split('T')
    return `${splitedDate[0]} ${splitedDate[1].split('.')[0]}`
  }

  const selectCard = (value: any) => {
    console.log(value)
    setSelectedData({
      objectId: value._id,
      id: value.code,
      date: convertUnixToTime(value.timestamp),
      machineName: value.machineName,
      suspectedReason: 'Unknown Anomaly',
      sourceAudio: value.audioFile
    })
    // console.log(value);
  }

  return (
    <div>
      <Navbar/>
      <div className='bg-white mx-2 my-2 border rounded'>
        <div className='mx-2 mt-1 pb-1 border-b border-gray-400'>
          <Dropdown data={["CNC Machine", "ABC Machine", "OMG Machine"]} onSelected={testSelect} className='w-64' />
        </div>
        <div className="flex">
          <div className="max-w-md">
            <div className='pb-3'>
              {/* back button */}
              <div className='flex px-5'>
                <button className='flex mt-3'>
                  <img className='mx-3 mt-2' src={BackIcon} alt="" />
                  <span className='mx-3'>Back</span>
                </button>
              </div>
            </div>

            <div className="py-2 border">
              {/* alert */}
              <div className="flex mx-4">
                <span className='text-xs pt-1 mr-3'>6 Alerts</span>
                <div className="text-xs px-3 bg-gr-default-blue text-white rounded-full py-1">2 New</div>
              </div>
            </div>

            <div className='px-3 py-3'>
              {/* cards */}
              {anomalies.map((data: any, index: number) => {
                return (
                  <Card key={index} onClick={(value) => selectCard(data)} selected={(selectedData?.id === data.code)}>
                    {(index <= 1) && (
                      <span className="absolute top-2.5 left-1.5">
                        <NotifBadge/>
                      </span>
                    )}
                    <div className="flex">
                      <div className='flex-grow text-sm'>ID #{data.code}</div>
                      <div className={((data.type == 'severe') ? 'bg-red-600' : (data.type === 'mild') ? 'bg-green-500' : 'bg-warning-gr') + " text-xs px-3 text-white rounded-full py-1"}>{data.type}</div>
                    </div>
                    <div className='pt-2'>
                      <span className="font-bold text-sm">Unknown Anomaly</span>
                    </div>
                    <div>
                      <span className='text-sm'>Detected at: {convertUnixToTime(data.timestamp)}</span>
                    </div>
                    <div className="mt-2">
                      <a href='#' className='text-sm text-gr-default-blue'>{data.machineName}</a>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* WAVEFORM DETAIL */}
          <div className="border-l border-gray-200 w-[70rem]">
            {(selectedData) && (
              <WaveFormDetail data={selectedData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
