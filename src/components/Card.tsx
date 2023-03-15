import { PropsWithChildren } from "react"
type CardProps = {
  onClick: (value: any) => void
  selected?: boolean
  // cardOnClick: () => void 
}

const Card = (props: PropsWithChildren<CardProps>) => {
  const onClickCard = (value: any = {}) => {
    props.onClick(value)
  }
  return (
    <div onClick={onClickCard} className={((props.selected) ? 'border-2 border-gr-default-blue ' : ' border border-gray-600 ') + 'px-5 py-2 rounded max-w-md mb-4 cursor-pointer relative'}>
      {props.children}
    </div>
  )
}

export default Card