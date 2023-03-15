import Dropdown from "./Dropdown"
import WaveformData, { WaveformDataChannel } from "waveform-data"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import * as d3 from 'd3'
import SpectroGram from "spectrogram"

type DetailProps = {
  data: {
    objectId: string,
    id: string,
    date: string,
    machineName: string,
    suspectedReason: string,
    sourceAudio: string
  }
}

const WaveFormDetail = (props: DetailProps) => {
  console.log(props)
  const [comment, setComment] = useState<string>('')
  const [action, setAction] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const ref = useRef<HTMLCanvasElement>(null)
  const ref2 = useRef<HTMLCanvasElement>(null)
  // const [area, setArea] = useState<any>()
  const drawChart = (waveform: WaveformData, name: string) => {
    const channel = waveform.channel(0)
    const x = d3.scaleLinear();
    const y = d3.scaleLinear();
    const offsetX = 100;

    const min = channel?.min_array() || [];
    const max = channel?.max_array() || [];
    x.domain([0, waveform.length]).rangeRound([0, 1000]);
    y.domain([
      Number(d3.min(min)),
      Number(d3.max(max))
    ]).rangeRound([offsetX, -offsetX]);
    const currentArea: any = d3.area()
      .x((d, i) => x(i))
      .y0((d, i) => y(min[i]))
      .y1((d, i) => y(Number(d)));

    // setArea(currentArea)
    const container = d3.select(`#${name}`)
    // const scaleX: any = d3.axisBottom(x)
    // const scaleY: any = d3.axisLeft(y)

    var scale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([0, 100]);
    var x_axis = d3.axisBottom(scale).scale(scale);

    container.selectAll('svg').remove();

    const svg = container.append('svg')
      .style('width', '100%')
      .style('height', '200px')
      .datum(max)
      .append('path')
      .attr('transform', () => `translate(0, ${offsetX})`)
      .attr("d", currentArea)
      .attr('fill', '#7a93ac')
      .attr('stroke', '#7a93ac');
    

      // svg.append('g').call(scaleX)
  }

  const updateComment = async (input: any) => {
    setComment(input.target.value)
  }


  const updateAction = (value: any) => {
    console.log(value)
  }
  const sentComment = async (oid: string) => {
    const response = await axios.patch(`https://groundup-test-api-isdj.vercel.app/anomalies/${oid}`, {
      suspectedReason: reason,
      action: action,
      comment: comment
    })
  }

  const fetchAudio = async () => {
    const audioContext = new AudioContext()
    const response = await axios.get(props.data.sourceAudio, {
      responseType: 'arraybuffer'
    })
    const buffer = response.data
    const options = {
      audio_context: audioContext,
      array_buffer: buffer,
      scale: 128
    }
    try {
      const canvas = ref.current;
      const canvas2 = ref2.current;
      if (canvas && canvas2) {
        const spectro = SpectroGram(canvas, {
          audio: {
            enable: false
          }
        })
        spectro.connectSource(buffer)
        spectro.start();

        const spectro2 = SpectroGram(canvas2, {
          audio: {
            enable: false
          }
        })
        spectro2.connectSource(buffer)
        spectro2.start();
      }
    } catch (error) {
      
    }

    try {
      const a: WaveformData = await new Promise((resolve, reject) => {
        WaveformData.createFromAudio(options, (err, waveform) => {
          if (err) {
            reject(err)
          } else {
            resolve(waveform)
          }
        })
      })
      // generate d3
      drawChart(a, 'waveform-chart')
      drawChart(a, 'waveform-chart2')
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchAudio()
    }, 1000)
  }, [])

  return (
    <div>
      <div className="mx-6 px-2 py-6 border-b border-gray-200">
        <div>
          <span className="text-2xl text-gray-600">Alert ID {props.data.id}</span>
        </div>
        <div>
          <span className="text-sm">Detected at {props.data.date}</span>
        </div>
      </div>

      {/*  Details */}
      <div className="mx-3 my-3 flex">
        <div className="w-64 h-64 mr-[5rem]">
          <div className="mb-4">
            <span className="font-lg ml-2">Anomaly Machine Output</span>
          </div>
          <audio src={props.data.sourceAudio} controls itemType="audio/wav"></audio>
          <div id="waveform-chart"></div>
          <canvas ref={ref} id="spectogram-chart"></canvas>
        </div>

        <div className="w-64 h-64">
          <div className="mb-4">
            <span className="font-lg ml-2">Normal Machine Output</span>
          </div>
          <audio src={props.data.sourceAudio} controls itemType="audio/wav"></audio>
          <div id="waveform-chart2"></div>
          <canvas ref={ref2} id="spectogram-chart2"></canvas>
        </div>
      </div>

      <div className="mx-6 mt-[13rem] mb-4">
        <div className="mb-3">
          <div>
            <span className='font-bold text-sm'>Equipment</span>
          </div>
          <div>
            <span className="text-sm">{props.data.machineName}</span>
          </div>
        </div>

        <div className="w-64 mb-3">
          <div>
            <span className="font-bold text-sm">Suspected Reason</span>
          </div>
          <div>
            <Dropdown data={["Unknown Anomaly", "Disrupted"]} onSelected={(value) => setReason(value)} defaultValue={props.data.suspectedReason} className='w-[100%]' />
          </div>
        </div>

        <div className='w-64 mb-3'>
          <div>
            <span className="font-bold text-sm">Action Required</span>
          </div>
          <div>
            <Dropdown data={["Remove Anomaly", "Fix Anomaly"]} onSelected={(value) => setAction(value)} defaultValue="Select Action" className='w-[100%]' />
          </div>
        </div>

        <div className='w-[60rem] mt-6'>
          <div>
            <span className="font-bold text-sm">
              Comments
            </span>
          </div>
          <textarea onChange={updateComment} className='border border-gray-200 w-[100%] rounded-lg px-2 py-2' name="" id="" cols={30} rows={10}></textarea>
        </div>

        <div className="mt-2">
          <button onClick={() => sentComment(props.data.objectId)} className="bg-gr-default-blue text-white px-3 pt-1 pb-2 rounded w-[7rem]">
            <span className="text-center text-white text-xs font-semibold">UPDATE</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WaveFormDetail