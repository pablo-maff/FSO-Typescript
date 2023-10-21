import { CoursePart } from "../types"
import Part from "./Part"

const Content = ({ content }: { content: CoursePart[]} ) => {
  return (
    <ul>
      {content.map((c, i) => (
        <li key={i}>
          <Part part={c} />
        </li>
      ))}
    </ul>
  )
}

export default Content