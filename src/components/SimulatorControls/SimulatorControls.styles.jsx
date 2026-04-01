import styled from 'styled-components'

export const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
`

export const CardLabel = styled.p`
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 14px;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

export const RowLabel = styled.span`
  font-size: 13px;
  color: var(--text-2);
  min-width: 100px;
  flex-shrink: 0;
`

export const Slider = styled.input`
  flex: 1;
  appearance: none;
  -webkit-appearance: none;
  height: 3px;
  border-radius: 2px;
  background: var(--surface-3);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--text-1);
    cursor: pointer;
    transition: transform 0.15s, background 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.25);
    background: var(--green);
  }
`

export const Readout = styled.span`
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-2);
  min-width: 38px;
  text-align: right;
  flex-shrink: 0;
`

export const Btn = styled.button`
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 5px 16px;
  border-radius: 20px;
  border: 1px solid var(--border-mid);
  background: ${({ $green, $red }) =>
    $green ? 'var(--green-d)' : $red ? 'var(--red-d)' : 'var(--surface-2)'};
  color: ${({ $green, $red }) =>
    $green ? 'var(--green)' : $red ? 'var(--red)' : 'var(--text-2)'};
  border-color: ${({ $green, $red }) =>
    $green ? 'var(--green)' : $red ? 'var(--red)' : 'var(--border-mid)'};
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: rgba(255, 255, 255, 0.22);
    color: var(--text-1);
  }
`
