type ParserError<T extends string> = { error: true } & T;
type EatWhitespace<State extends string> = string extends State
  ? ParserError<'EatWhitespace got generic string type'>
  : // tslint:disable-next-line: no-shadowed-variable
  State extends ` ${infer State}` | `\n${infer State}`
  ? EatWhitespace<State>
  : State;
