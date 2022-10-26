export default function Container(props) {
  return (
    <div className="flex flex-row">
        {props.children}
    </div>
  )
}
