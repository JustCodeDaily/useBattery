import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`

export const Chip = styled.div`
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 12px;
  transition: border-color 0.25s;

  &:hover {
    border-color: var(--border-mid);
  }
`

export const Label = styled.span`
  display: block;
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 6px;
`

export const Value = styled.span`
  display: block;
  font-family: var(--mono);
  font-size: 16px;
  font-weight: 500;
  color: var(--text-1);
`
