interface ContentProps {
  name: string,
  exerciseCount: number
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`)
  }

  return name
}

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number || !isNaN(Number(number))
}

const parseExerciseCount = (exerciseCount: unknown): number => {
  if (!isNumber(exerciseCount)) {
    throw new Error(`Incorrect or missing exercise count: ${exerciseCount}`)
  }

  return exerciseCount
}

const Content = ({ content }: {content: ContentProps[]}) => {
  if (!content || content.some(c => !parseName(c.name)) || content.some(c => !parseExerciseCount(c.exerciseCount))) {
    return (
      <div>
        <p>Missing or not valid content props</p>
      </div>
    )
  }

  return (
    <ul>
      {content.map((c, i) => (
        <li key={i}>
          <p>{c.name} {c.exerciseCount}</p>
        </li>
      ))}
    </ul>
  )
}

export default Content