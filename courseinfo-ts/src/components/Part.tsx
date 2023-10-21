import { CoursePart } from "../types"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart}) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <strong>
            <p>{part.name} {part.exerciseCount}</p>
          </strong>
          <em>
            <p>{part.description}</p>
          </em>
        </div>
      )
    case 'group':
      return (
        <div>
          <strong>
            <p>{part.name} {part.exerciseCount}</p>
          </strong>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <strong>
            <p>{part.name} {part.exerciseCount}</p>
          </strong>
          <em>
            <p>{part.description}</p>
          </em>
          <p>submit to <a href={part.backgroundMaterial} target="_blank" rel="noreferrer" >{part.backgroundMaterial}</a></p>
        </div>
      )
    case 'special':
      return (
        <div>
          <strong>
            <p>{part.name} {part.exerciseCount}</p>
          </strong>
          <em>
            <p>{part.description}</p>
          </em>
          <p>Required skills: {part.requirements.join(' ')}</p>
        </div>
      )

    default:
      return assertNever(part)
  }
}

export default Part