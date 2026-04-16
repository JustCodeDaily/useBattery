import { Grid, Chip, Label, Value } from './StatGrid.styles'

export function StatGrid({ charging, supported }) {
  const stats = [
    {
      label: 'Charging',
      value: !supported
        ? 'N/A'
        : charging === null
        ? '…'
        : charging
        ? 'Yes ⚡'
        : 'No',
    },
  ]

  return (
    <Grid>
      {stats.map((s) => (
        <Chip key={s.label}>
          <Label>{s.label}</Label>
          <Value>{s.value}</Value>
        </Chip>
      ))}
    </Grid>
  )
}
