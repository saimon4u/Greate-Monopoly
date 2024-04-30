import { PropType } from '../utils/PropType'

function Card(props: PropType) {
    let classNames = `h-32 w-32 border-2 border-black rotate-${props.rotate} flex flex-col gap-2 items-center`
  return (
    <div className={classNames}>
      <div className={`h-6 ${props.color} w-full`}></div>
      <p className='text-white'>{props.name}</p>
      <img src={props.icon} alt="Icon" className='w-8 h-8'/>
      <p className='text-white'>{`$${props.rent}`}</p>
    </div>
  )
}

export default Card
