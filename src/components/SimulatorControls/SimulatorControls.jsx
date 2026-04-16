import { Card, CardLabel, Row, RowLabel, Slider, Readout, Btn } from './SimulatorControls.styles'

export function SimulatorControls({ level, charging, supported, onLevel, onCharge, onSupport }) {
  return (
    <Card>
      <CardLabel>Simulate Changes</CardLabel>

      <Row>
        <RowLabel>Battery level</RowLabel>
        <Slider
          type="range"
          min={0}
          max={100}
          step={1}
          value={level}
          onChange={(e) => onLevel(Number(e.target.value))}
        />
        <Readout>{level}%</Readout>
      </Row>

      <Row>
        <RowLabel>Charging</RowLabel>
        <Btn $green={charging} onClick={onCharge}>
          {charging ? 'Unplug' : 'Plug in'}
        </Btn>
      </Row>

      <Row>
        <RowLabel>Supported</RowLabel>
        <Btn $green={supported} $red={!supported} onClick={onSupport}>
          {supported ? 'Supported' : 'Unsupported'}
        </Btn>
      </Row>
    </Card>
  )
}
