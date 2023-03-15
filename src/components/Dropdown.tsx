import { useEffect, useState } from "react"

type DropdownProps = {
  data: Array<string|Record<string, string|number>>,
  onSelected?: (value: string) => void,
  defaultValue?: string,
  className?: string
}

const Dropdown = ({data, onSelected, defaultValue, className}: DropdownProps) => {
  const [shown, setShown] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || "Please Select")
  const toggleDropdown = () => setShown(!shown)
  const chooseData = (value: any) => {
    setSelectedValue(value);
    setShown(false)
    if (onSelected) onSelected(`${value}`)
  }

  useEffect(() => {
    setSelectedValue(defaultValue || 'Please Select')
  }, [defaultValue])

  // const data = ["CNC Machine", "CNB Machine", "OMG Machine"]
  return (
    <div className={((className) ? `${className} ` : '') + "inline-flex bg-white border rounded-md relative"}>
      <button onClick={toggleDropdown} className={((className) ? `${className} ` : '') + "flex px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"}>
        {selectedValue}
        <span className="absolute right-2 top-4">
          <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.31799 9.70001L-1.33514e-05 1.23978e-05L16.636 1.23978e-05L8.31799 9.70001Z" fill="#2A2E5D"/>
          </svg>
        </span>
      </button>

      <div className="absolute left-[14rem] mt-5">
        <div className={((!shown) ? "invisible " : "") + "absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg"}>
          <div className="p-2">
            {data.map((value: any, index: number) => {
              return (
                <button key={index} onClick={() => chooseData(value)} className="block px-4 py-2 text-sm w-[100%] text-left text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
