import {
  Block,
  BlockLabel,
  Code,
  Line,
  Indent,
  Brace,
  Key,
  Colon,
  Comma,
  TrueVal,
  FalseVal,
  NullVal,
  NumVal,
  InfVal,
} from './StateDisplay.styles'

const VALUE_COMPONENTS = {
  true: TrueVal,
  false: FalseVal,
  null: NullVal,
  num: NumVal,
  inf: InfVal,
}

function cls(val) {
  if (val === null || val === undefined) return 'null'
  if (val === true) return 'true'
  if (val === false) return 'false'
  if (!isFinite(val)) return 'inf'
  return 'num'
}

function CodeLine({ propKey, value, valueClass }) {
  const ValComponent = VALUE_COMPONENTS[valueClass] || NumVal
  return (
    <Line>
      <Indent />
      <Key>{propKey}</Key>
      <Colon>: </Colon>
      <ValComponent>{value}</ValComponent>
      <Comma>,</Comma>
    </Line>
  )
}

export function StateDisplay({ supported, loading, level, charging }) {
  const lvlDisplay = level !== null ? level.toFixed(2) : 'null'
  const chgDisplay = charging !== null ? String(charging) : 'null'

  return (
    <Block>
      <BlockLabel>State Object Returned</BlockLabel>
      <Code>
        <Brace>{'{'}</Brace>
        <CodeLine propKey="supported" value={String(supported)} valueClass={cls(supported)} />
        <CodeLine propKey="loading" value={String(loading)} valueClass={cls(loading)} />
        <CodeLine propKey="level" value={lvlDisplay} valueClass={cls(level)} />
        <CodeLine propKey="charging" value={chgDisplay} valueClass={cls(charging)} />
      </Code>
    </Block>
  )
}
