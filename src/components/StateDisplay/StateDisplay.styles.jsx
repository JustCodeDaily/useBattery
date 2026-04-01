import styled from 'styled-components'

export const Block = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
`

export const BlockLabel = styled.p`
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 14px;
`

export const Code = styled.div`
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 2;
`

export const Line = styled.span`
  display: block;
`

export const Indent = styled.span`
  display: inline-block;
  width: 1.6em;
`

export const Brace = styled.span`
  color: var(--text-3);
`

export const Key = styled.span`
  color: var(--blue);
`

export const Colon = styled.span`
  color: var(--text-3);
`

export const Comma = styled.span`
  color: var(--text-3);
`

export const TrueVal = styled.span`
  color: var(--green);
`

export const FalseVal = styled.span`
  color: var(--red);
`

export const NullVal = styled.span`
  color: var(--text-3);
  font-style: italic;
`

export const NumVal = styled.span`
  color: var(--amber);
`

export const InfVal = styled.span`
  color: var(--text-2);
  font-style: italic;
`
